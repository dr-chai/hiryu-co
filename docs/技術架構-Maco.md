# HIRYU MVP 技術方案（Maco 收斂版）

## 1. 目錄結構（Next.js App Router）

```
hiryu/
├─ app/
│  ├─ layout.tsx            # 掛 Header / Footer / CartProvider / 全站 font
│  ├─ page.tsx              # 首頁：Hero + 雙入口 + collections + Makers
│  ├─ room/page.tsx         # THE HIRYU ROOM（2.5D 虛擬店）
│  ├─ shop/page.tsx         # 商品列表／搜尋／篩選
│  ├─ shop/[slug]/page.tsx  # 商品詳情
│  └─ collections/[slug]/page.tsx
├─ components/
│  ├─ brand/    # LogoMorph / Hero / Header / Footer
│  ├─ commerce/ # ProductCard / ProductDetail / CartDrawer / SearchBar / FilterBar
│  ├─ room/     # Room / Floor / ProductHotspot / BringToLightModal / RawShineSwitcher
│  └─ ui/       # GlassPanel / Button / Chip（Liquid Glass 只放呢度）
├─ lib/
│  ├─ types.ts    # Product / CartLine / Collection / Floor enum
│  ├─ store.ts    # zustand cart store（localStorage 持久化）
│  └─ selectors.ts# byFloor / byCollection / search 純函數
└─ data/          # products.json / collections.json / makers.json
```

**關鍵分層鐵律**：`lib/` 係 Commerce Core（資料＋邏輯），`components/room/` 係純展示層，兩者靠 `selectors.ts` 對接——之後換 R3F 淨係換 `room/`，commerce 唔使郁。

## 2. Mock data 模型（JSON schema）

```json
{
  "id": "sku-007", "slug": "glass-paperweight-no7",
  "brand": "光る硝子工房", "name": "七号 手吹玻璃紙鎮",
  "price": { "currency": "HKD", "amount": 68 },
  "material": ["手吹玻璃", "拉絲鋁"],
  "story": "每件都係廢料玻璃重熔，搵到自己嘅光。",
  "category": "光を纏う",              // 對應 collection slug
  "floor": "F1",                        // B1=未定形 / F1=光の棚 / F2=輝琉之間
  "origin": "香港",
  "colors": ["琉璃青", "琥珀金"],
  "images": { "raw": "/img/...", "shine": "/img/..." },
  "position": { "x": 0.35, "y": 0.6, "z": 0 }  // room hotspot 歸一化坐標
}
```

Cart line：`{ id, slug, qty, color, unitPrice }`。Collection：`{ slug, name, tagline, productIds[] }`。用 `Floor = "B1"|"F1"|"F2"` enum + `position`（x/y/z 0–1）就係日後 R3F anchor point，SKU 對應只靠 `id`，唔靠 UI 位置。

## 3. 2.5D 虛擬店實作（Framer Motion，無 R3F）

- **垂直上樓**：`room/page.tsx` 用 `useScroll()` + `useTransform()`，三層各一個 100vh `<Floor>`，scroll 進度映射做「鏡頭 Y 位移＋parallax＋背景由 `#10100F` 漸變暖白」。scroll = 上樓 = 由廢到輝。
- **hotspot ↔ SKU**：`selectors.byFloor(products, "F1")` 出嗰層商品，每件 `<ProductHotspot>` 用 `style={{ left: position.x*100+"%", top: position.y*100+"%" }}` 絕對定位，`data-product-id={id}` 做唯一 key。hover 用 `whileHover={{ scale: 1.06 }}` + 一圈薄折射光（`box-shadow` 唔用 blur）。
- **帶到光裡**：`BringToLightModal` 用 **shared layoutId**（`<motion.div layoutId={product.id}>`）——hotspot 點擊後 AnimatePresence 將元素由店內位置 smooth 浮到中央、加一層玻璃折射 overlay（`backdrop-filter` 只喺呢個 modal 用），再 morph 成 2D `<ProductDetail>` 卡。關閉時 layoutId 自動飛返原位。
- **Raw/Shine 切換**：`RawShineSwitcher` 兩個 `AnimatePresence` crossfade：Raw=原圖無特效，Shine=同一圖加 `filter: drop-shadow(0 0 12px #65C8C2) brightness(1.08)`，切換只郁 filter/opacity，唔郁 layout 防 reflow。
- **加購飛光點**：click「加購」→ `getBoundingClientRect()` 攞卡同 cart icon 坐標 → `animate` 一粒光點由 A 飛 B → 縮入 CartDrawer。
- **R3F 升級路徑**：`Room` 只係 presentation，收 props `products: Product[]`。V2 寫 `RoomR3F`（讀同一 `products`，用 `position` 做 GLB anchor，hotspot 改 `<Html>` 標籤），`room/page.tsx` 一行 swap，commerce 零改動。

## 4. Build order（最快出首頁）

1. Scaffold：Next.js + Tailwind + `framer-motion` + `next/font`（思源宋體/黑體）＋顏色 token 入 `tailwind.config`。
2. `data/products.json` + `lib/types.ts` + `lib/store.ts`（**資料層行先**，全部頁都依賴）。
3. `Header` + `Hero` + `LogoMorph`（廢→輝 SVG morph）→ **首頁即刻見光**。
4. `ProductCard` + `shop/` + `shop/[slug]/` + `CartDrawer`（2D 商務 core＝「直接選購」fallback）。
5. `room/` 五件套（Room/Floor/ProductHotspot/BringToLightModal/RawShineSwitcher）。
6. Raw/Shine + 加購飛光點 + 動效打磨 + reduced-motion。

## 5. 技術風險／坑

- **SSR × Framer Motion**：`useScroll/useTransform` 只可 client；Room 全家加 `"use client"`，避免 server render 出 motion value 造成 hydration mismatch。LogoMorph 用 `useEffect` mount 後先播。
- **動效效能**：`feGaussianBlur`／`backdrop-filter`／大面積 `drop-shadow` 係 GPU 殺手，只放 accent（nav/CTA/modal/cart），大圖唔加。動畫只用 transform+opacity，`will-change` 慎用。
- **layoutId 跨樹**：CartDrawer 用 portal 掛 body，同 ProductDetail 唔喺同一棵 tree 時 shared layout 會失效——加購飛光點改用「計坐標 + 手動 animate」唔靠 layoutId。
- **Mobile fallback**：`pointer: coarse`／窄屏時 Room 三層變普通 stacked list，2.5D 效果降級；永遠保留「直接選購」入口，唔好令手機得 3D 一條路。
- **圖片**：`next/image` + hero `priority`；Raw/Shine 兩張圖一齊 preload 先唔會閃白。
- **無障礙**：`useReducedMotion()` 關閉 morph／飛光點，hotspot 可鍵盤 focus、語意 `<button>`。
