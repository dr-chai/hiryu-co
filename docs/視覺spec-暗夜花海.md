# HIRYU 視覺 Spec — 暗夜花海（concept → 落地設計語言 · 實圖校準版）

> 由 Deep 綜合：心喬 Summer concept（v3）+ 問鼎 gem-3.7-flash 代睇 9 張參考圖（`參考圖分析-暗夜花海.md`）。
> 呢份係**俾 coding agent（Maco/Kimi）可直接落地**嘅 spec，配色全部以真圖為準。

---

## 一、配色 Token（真圖 hex · 兩個 mood）

> 核心：**黑唔係純黑、白唔係純白、紅做焦點、金做金繕、藍紫係第二 mood**。

### 底色（黑，混用做深度）

| Token | Hex | 用喺 |
|---|---|---|
| `--ink`（玄青黑） | `#080B10` | 主背景（帶微冷藍調，唔係 `#000`） |
| `--plum`（焦炭深紫黑） | `#12090D` | 紅調構圖暗部、酒紅基底陰影 |
| `--indigo`（夜幕青紺） | `#1E2749` | 藍紫版過渡漸變 |

### 焦點（紅＝情緒焦點；藍紫＝第二 mood）

| Token | Hex | 用喺 |
|---|---|---|
| `--crimson`（緋紅核心） | `#FF2A4D` | 按鈕、花心、裂紋滲光、限量標籤（透光發光核心） |
| `--bordeaux`（沉香酒紅） | `#8B1E3F` | 暗部花瓣、水影沉積 |
| `--violet`（紫晶透光） | `#845EC2` | 藍紫版花瓣、色散邊緣 |
| `--cyan`（琉璃青藍焦散） | `#00B4D8` | 水下 caustics（藍紫版專用，唔係舊青綠光軸） |

### 白（琉璃反光）＋ 金（金繕點睛）

| Token | Hex | 用喺 |
|---|---|---|
| `--bone`（琉璃骨白） | `#F7F4EA` | 正文、主標題、高光（微暖 SSS 質感，**唔用 `#FFFFFF`**） |
| `--gold`（新藝術金絲） | `#E2C076` | 金繕裂縫、logo 點睛、極細 filigree 線條 |

> 完整 Tailwind 4 `@theme` 見 `參考圖分析-暗夜花海.md` §六。

---

## 二、材質（三種核心質感）

1. **琉璃晶體**：次表面散射（SSS，內部吸光再透出）+ 色散（邊緣三稜鏡彩虹邊）＝「碎裂透光」。
2. **水面焦散**：有機網狀 caustics（光穿流動水體聚焦嘅光紋）+ 菲涅爾反射（越平視越反射）。
3. **金繕金絲**：琉璃邊緣極細金絲游線（Kintsugi filigree）＝「碎而有光」嘅視覺化身。

## 三、光影（由內自發光）

- **bioluminescence**：光唔係頂部照落，而係藏喺琉璃內部／水底滲出。
- **volumetric glow**：高光邊緣伴微微霧化 bloom（玻璃有呼吸感）。
- **rim light**：暗部極深，物體邊緣極細極亮金/青輪廓光。

## 四、構圖（無邊界花海）

- **C-curve 包圍場域**：前景有機琉璃 + 中景流動焦散 + 背景垂掛夜藤，成半弧形包圍（去中心化）。
- **無限鏡面延伸**：地平線壓低／消隱於黑暗，空間上下無限鏡像（失重漂浮）。
- **實體留白**：上方留 40–50% 墨色虛空，同下方繁複光影成「極簡 vs 極繁」張力。

---

## 五、字體系統（幽玄 × 新藝術）

| 角色 | 字體 | 字重 |
|---|---|---|
| 大標題／品牌（拉丁） | `Cormorant Garamond` / `PP Editorial New` | Ultralight / Italic，tracking 0.25em |
| 大標題（中文） | 思源宋體 Source Han Serif | Light 300（橫細豎粗） |
| 正文／UI | `PP Neue Montreal` / `Inter Tight` | 300 / 400（冷靜黑體） |

字級：正文 16px → 主標題 96–128px（6–8×），`clamp(3rem, 9vw, 8rem)`。

---

## 六、Hero 結構（輝琉夜庭 · 深度分層）

1. **Backdrop**：`#080b10` 純暗底 + 漂浮暗夜藤蔓 SVG / 霧氣粒子。
2. **Center Stage**：3D 主題物（碎裂琉璃）懸浮透明琉璃台，帶內部自發光。
3. **Foreground Base**：底部 30vh 動態焦散水面（WebGL），鏡像倒影 = 無底深淵。
4. **前景內容**：巨型「輝琉 HIRYU／廢而不頹，碎而有光」＋副句「給仍在黑暗裡 保留一點反光的人」＋ CTA「進入輝琉夜庭」。
5. **UI 排版**：日式雜誌佈局，導航/標語分散四角，中央留白俾光影呼吸。

## 七、動效（5 大特效 · 簡單版 CSS ＋ 進階版 WebGL）

| 特效 | 簡單版 | 進階版 |
|---|---|---|
| 鏡面無限反射 | `scaleY(-1)` 倒影 + blur + 漸層 fade | Three.js 遞迴 render-to-texture |
| 琉璃折射 | SVG `feTurbulence`+`feDisplacementMap` + backdrop-blur | `MeshPhysicalMaterial { transmission, ior, thickness }` |
| 水面焦散 | 多層 blurred radial gradient | 自訂 fragment shader caustics（hover 漣漪） |
| 花海粒子 | 高光花 SVG 緩慢漂浮 | `InstancedMesh` + shader（隨風擺動） |
| 新藝術金絲 | SVG path 描邊 | `motion.path` `pathLength [0,1]` + 優雅 ease |

## 八、對標參考站

1. **Cartier Nature Sauvage / Chanel High Jewelry** — 黑空間 + 珠寶琉璃 SSS + 光束掃射。
2. **Apple Vision Pro Landing** — 有機玻璃、菲涅爾光感、流體擬態。
3. **Studio DRAMA / A24 Interactive** — 暗黑浪漫主義排版 + 精準微動效。

## 九、v2 → v3 對照

| 項目 | v2（舊） | v3（新） |
|---|---|---|
| 底色 | 黑曜石 `#10100F` | 玄青黑 `#080B10` + 焦炭深紫黑 `#12090D` 混用 |
| accent | 琉璃青綠 `#65C8C2`（單一） | **緋紅 `#FF2A4D`（紅版）+ 紫晶 `#845EC2`（藍紫版）** 雙 mood |
| 白 | 米白 `#F3F0E9` | **琉璃骨白 `#F7F4EA`**（SSS 質感） |
| 金 | 無 | **新藝術金絲 `#E2C076`**（金繕點睛） |
| 光 | 單一青綠光軸 | **由內自發光 + 色散 + 金繕**（碎而有光） |
| 主物件 | 缺 | **碎裂琉璃**（藤蔓包住、透光、SSS） |
| 空間 | 2.5D 上樓 | **無邊界花海 + 鏡面焦散水境** |
| 宣言 | 冇人係廢物… | **廢而不頹，碎而有光** |
| 敘事 | 由廢到輝 | ✅ 保留，升級做「裂縫＝光嘅入口」 |

---

*呢份係 v3 落地 spec（實圖校準版）。等 Daddy 拍板 palette／字體，再交 coding agent 動工改版。*
