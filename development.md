# 3D Portfolio Website — Developer Specification

> **Codename:** *Play & Build with Me!*
>
> **Goal:** 以可愛 3D 角色作為導覽人，打造一個兼具互動感與資訊完整度的個人作品網站，展現 Landing Page、About (含經歷)、Side Projects、Contact Me 四大分頁。

---

## 1. 摘要

這份文件描述了網站的功能範圍、技術選型、檔案結構、互動流程以及資產（3D/Spine）占位設定，供大型語言模型（LLM）或開發者直接使用，以最短時間開始撰寫程式碼。

---

## 2. 關鍵功能清單

| # | User Story                         | 互動重點                 | 完成判定                       |
| - | ---------------------------------- | -------------------- | -------------------------- |
| 1 | 作為訪客，我想在 Landing Page 與角色互動，快速進入網站 | 角色 hover 動作／CTA 滑入動畫 | 角色動畫執行 & CTA 觸發 About Page |
| 2 | 作為訪客，我想在 About Page 了解站主背景和經歷     | 時間軸動畫與互動            | 時間軸完整顯示並可互動              |
| 3 | 作為訪客，我想瀏覽 Side Projects 並點擊詳情      | 實驗室場景／角色小劇場          | 專案卡片顯示 + 圖片/影片載入           |
| 4 | 作為訪客，我要能輕鬆聯絡站主                     | 表單輸入時角色視覺回饋          | 成功送出後訊息提醒                  |

---

## 3. 技術選型

* **框架**：Next.js 14（App Router）
* **3D 引擎**：React Three Fiber (R3F) + Drei
* **Spine 動畫**：`@esotericsoftware/spine-webgl`（或 spine‑runtimes for three.js）
* **動畫控制**：GSAP（scrollTrigger）/ Framer Motion
* **樣式**：Tailwind CSS + SCSS module (供覆蓋)
* **音效**：Howler.js
* **表單寄送**：EmailJS
* **部署**：Vercel；自動化 CI/CD

---

## 4. 專案目錄結構 (雛形)

```plaintext
/ (root)
├─ public/
│  ├─ models/            # glTF/GLB 3D 模型
│  │   ├─ character.glb
│  │   ├─ scene_landing.glb
│  │   └─ ...
│  ├─ spine/             # Spine 動畫
│  │   ├─ throw.json
│  │   ├─ throw.atlas
│  │   └─ ...
│  └─ textures/
├─ src/
│  ├─ app/               # Next.js app router
│  │   ├─ layout.tsx
│  │   ├─ page.tsx       # Landing
│  │   ├─ about/page.tsx
│  │   ├─ experience/page.tsx
│  │   ├─ projects/page.tsx
│  │   └─ contact/page.tsx
│  ├─ components/
│  │   ├─ Character.tsx             # 角色載入 + 動畫
│  │   ├─ SceneLanding.tsx          # Landing 3D 場景
│  │   ├─ SceneAbout.tsx            # About 場景
│  │   ├─ Timeline.tsx              # Experience 時間軸
│  │   ├─ ProjectCard.tsx           # 專案卡片
│  │   └─ ...
│  ├─ hooks/
│  ├─ lib/
│  └─ styles/
└─ README.md
```

---

## 5. 資產占位 (Assets Placeholders)

| Asset ID        | 類型    | 檔名 / 資料夾            | 描述             | 備註            |
| --------------- | ----- | ------------------- | -------------- | ------------- |
| `char_main`     | glTF  | `character.glb`     | 主角靜態網格         | 從 2D 角色轉 3D   |
| `spine_throw`   | Spine | `spine/throw.json`  | 投籃動作           | 用於 Loading/彩蛋 |
| `scene_landing` | glTF  | `scene_landing.glb` | 籃球場 + UI 懸浮    | Landing Page  |
| `scene_desk`    | glTF  | `scene_desk.glb`    | 書桌 / About     | Hover Reveal  |
| `scene_lab`     | glTF  | `scene_lab.glb`     | 實驗室 / Projects | 複數物件可點擊       |
| `audio_click`   | mp3   | `audio/click.mp3`   | 點擊音效           | 可替換           |

> **Spine 占位說明**：請在對應頁面加入標籤 `<!-- SpinePlaceholder:{AssetID} -->`，供 LLM 搜尋並插入 spine-runtime 相關程式碼。

---

## 6. Page Specs & 互動腳本

### 6.1 Landing (`/`)

* 主要組件：`<SceneLanding>`、`<CTAButton>`
* GSAP Scroll：淡入 – 角色揮手 – CTA 浮現
* TODO: 為 `CTAButton` 添加焦點環 (focus ring)

### 6.2 About (`/about`)

* 主要組件：`<Timeline>`
* 使用 Framer Motion `whileInView` 實現時間軸動畫
* 卡片點擊展開詳細資訊
* TODO: 實作 `useTimelineAnimation()` hook

### 6.3 Experience (`/experience`)

* `Timeline` 元件使用 Framer Motion `whileInView`
* 角色 `char_main` 依 scrollY 進度在時間軸上移動

### 6.4 Side Projects (`/projects`)

* `<ProjectCard>` 於 `scene_lab` 裡以 InstancedMesh 堆疊
* 點擊專案 → React Portal 彈窗

### 6.5 Contact (`/contact`)

* 表單：React Hook Form + Yup  驗證
* 成功時觸發角色揮手 (`char_main` animation clip `wave`)

---

## 7. Animation States (範例)

| State 名      | 觸發         | 動畫 Asset            | 備註            |
| ------------ | ---------- | ------------------- | ------------- |
| `idle`       | 頁面載入       | `char_main` Clip #0 | 預設呼吸          |
| `hover_wave` | hover 角色   | Clip #1             | 1.2s          |
| `throw`      | Loading 彩蛋 | `spine_throw`       | Spine runtime |

---

## 8. LLM TODO Markers

在程式碼中標記以下格式，方便 LLM 匹配：

```tsx
// TODO-LLM:<ComponentName>:<Description>
```

例如：

```tsx
// TODO-LLM:SceneLanding:Load scene_landing.glb and add CTA hover effect
```

---

## 9. 環境安裝

```bash
pnpm create next-app my-portfolio --ts --tailwind --eslint --app
cd my-portfolio
pnpm add three @react-three/fiber @react-three/drei gsap framer-motion @esotericsoftware/spine-webgl howler @emailjs/browser
```

---

## 10. Milestones & Issue 標籤

| 里程碑 | 任務                       | GitHub Label |
| --- | ------------------------ | ------------ |
| M1  | 環境 + 3D 場景載入             | `setup`      |
| M2  | Landing + About 完成       | `feature`    |
| M3  | Experience 時間軸           | `feature`    |
| M4  | Side Projects + Spine 整合 | `animation`  |
| M5  | Contact 表單 & 部署          | `release`    |

---

## 11. 參考資源

* React Three Fiber Docs
* GSAP ScrollTrigger Docs
* Tailwind CSS Docs
* Spine WebGL Runtime Example

---

> **License & Ownership**
> 所有設計與程式碼最終歸站主所有，開源條款待定。
