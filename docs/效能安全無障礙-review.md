# HIRYU MVP — 效能／安全／無障礙 review（Codex）

> 實測對比度係用 WCAG 公式計出嚟（唔係估）。以下全部係可執行數字。

## 1. 效能預算（CI 要 gate，唔過就唔 merge）

| 指標 | 預算（p75，3G 中階手機） |
|---|---|
| LCP | ≤ 2.5s（首屏 Hero 圖係 LCP 元素） |
| FCP | ≤ 1.8s |
| CLS | < 0.1（圖片/字體一定要留尺寸） |
| INP | < 200ms |
| 首屏 JS | ≤ 170KB gzip（Next 官方建議） |
| 總 bundle | ≤ 250KB gzip |
| 動畫 | 60fps = 每 frame ≤ 16.6ms；只用 `transform`/`opacity`，禁 `top/left/width` |

**圖片／資產**
- 全部經 `next/image`：AVIF 主、WebP fallback、自動 `sizes`+`srcset`。首屏 Hero ≤ 150KB、商品圖 ≤ 100KB、縮圖 ≤ 30KB。
- 除 LCP 圖外全部 `loading="lazy"`；LCP 圖 `priority` + `fetchPriority="high"`。
- **SVG morph 成本**：廢→輝用 `stroke-dashoffset`/path morph，DOM 節點 < 50，`feGaussianBlur` 極食 GPU → 只喺 morph 3 秒開、完即 off，光暈改用 CSS `filter: drop-shadow`。

## 2. 2.5D 唔拖慢

- **首屏零 3D**：THE HIRYU ROOM 首屏用 CSS 3D（`perspective` + `translateZ` 視差）扮 2.5D，唔使 WebGL。
- 撳「入店」先 `next/dynamic(() => import(...), { ssr:false })` lazy-load 3D（R3F 留 V2）。
- `IntersectionObserver` 入 viewport 先掛動畫，離開 `unmount`/pause；Framer Motion 用 `whileInView`（`viewport={{once:true}}`）。
- **Mobile（<768px）降級**：關 reflection/blur、6 hotspot 減到 3、直接 CSS 視差 fallback。`navigator.gpu`／WebGL 檢測 fail 或慢網（`navigator.connection.saveData`）→ 自動切 2D gallery（憲章已要求）。
- **Fallback 原則**：光效先用 CSS `radial-gradient` + 低強度 `backdrop-filter`；3D 永遠係「可拔走」展示層，唔係唯一入口。

## 3. 無障礙（對比度係實測）

**琉璃青綠 on 黑曜石 = 9.6:1 ✅（過到 AAA）**；琥珀金 9.5:1 ✅、紫羅蘭 5.2:1 ✅——深底全部過關。

**但喺米白 `#F3F0E9` 底全部肥佬 ❌**（呢個係最大風險，商品頁/結帳用淺底）：
- 琉璃青綠 1.74:1、琥珀金 1.76:1（正文要求 4.5:1）
- 朱砂紅 4.09:1（只夠大字/UI，唔夠正文）

**修法：淺底用「深色變體」**（我計好，直接抄）：
| 角色 | 深底用（原色） | 淺底用（變體） |
|---|---|---|
| 青綠 | `#65C8C2` 9.6:1 | `#1F6F6A` 5.2:1 |
| 琥珀金 | `#E3AE5C` 9.5:1 | `#8A5A1E` 5.2:1 |
| 朱砂紅 | `#C84A40`（大字） | `#A63B32` 5.6:1 |
| 紫羅蘭 | `#8B78D6` 5.2:1 | `#5B4A94` 6.5:1 |

- **鍵盤**：hotspot/商品卡用 `<button>`（可 Tab），Enter/Space 觸發；購物袋 drawer 有 focus trap + `Esc` 關閉；首個連結做「跳去內容」skip link；`::focus-visible` 要 visible（青綠 2px outline）。
- **語意**：`nav/main/section/footer`、商品卡 `<article>`、刪除價用 `<s>`、購物袋/hotspot 加 `aria-label`。
- **螢幕閱讀器**：裝飾動畫 `aria-hidden`；「帶到光裡」轉場後用 `aria-live="polite"` 宣告「已加入購物袋」。
- **`prefers-reduced-motion`**：關 morph/視差/光粒子，只保留 <200ms 淡入淡出（Framer `useReducedMotion`）。

## 4. 安全（預留位）

**現階段（mock）**：資料全部 JSON、唔用 `dangerouslySetInnerHTML`，React 預設 escaping 已擋 XSS。

**接真電商前必做（而家就埋定結構）**：
- **環境變數**：`.env.local` 入 `.gitignore`（不入 git）；`NEXT_PUBLIC_` 前綴只放可公開 key，API secret 只喺 server。
- **依賴**：`pnpm audit` 入 CI + lockfile 提交 + Dependabot 自動開 PR。
- **輸入**：搜尋、寄賣申請等 user 輸入用 zod schema server-side 驗證；輸出 encode。
- **CSP header**：`script-src 'self'`（無 inline）、`frame-ancestors 'none'`、`upgrade-insecure-requests`。
- **付款**：用 Stripe Checkout/Session token 化，卡號永不經自己 server。
- **VPS 加固**：UFW 只開 80/443/SSH、SSH 只 key 登入（`PermitRootLogin no`）、fail2ban、`unattended-upgrades`、強制 HTTPS + HSTS。

## 5. SEO／metadata

- 2D 商品列表／詳情頁用 **SSG/SSR**（唔靠 client-side 先出貨），先至俾 Google 收錄；2.5D 房只做「體驗入口」，SEO 主力係 2D 頁。
- 每頁 `<title>` + `<meta description>`（150–160 字）+ OG/Twitter 卡 + `lang="zh-Hant"` + canonical URL。
- **JSON-LD**：`Organization` + `Product`（價錢/`Offer`）+ `BreadcrumbList`。
- `sitemap.xml` + `robots.txt`；圖片 `alt` + 固定尺寸（兼顧 CLS）。
