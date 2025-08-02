# 🎮 3D Portfolio Website - Play & Build with Me!

> 以可愛 3D 角色作為導覽人，打造一個兼具互動感與資訊完整度的個人作品網站

## ✨ 功能特色

- 🏀 **互動式 3D 場景** - 使用 React Three Fiber 打造沉浸式體驗
- 👤 **可愛角色導覽** - 點擊角色觸發動畫和互動
- 📱 **響應式設計** - 完美適配各種裝置
- 🎨 **現代化 UI** - 使用 Tailwind CSS 打造美觀介面
- ⚡ **高效能載入** - Next.js 14 App Router 最佳化
- 🎭 **動畫效果** - GSAP 和 Framer Motion 流暢動畫

## 🛠️ 技術棧

- **前端框架**: Next.js 14 (App Router)
- **3D 引擎**: React Three Fiber + Drei
- **動畫庫**: GSAP, Framer Motion
- **樣式系統**: Tailwind CSS
- **表單處理**: React Hook Form + Yup
- **類型檢查**: TypeScript
- **郵件服務**: EmailJS (待實作)

## 🚀 快速開始

### 1. 安裝依賴

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm (推薦)
pnpm install
```

### 2. 啟動開發伺服器

```bash
# 使用 npm
npm run dev

# 或使用 yarn
yarn dev

# 或使用 pnpm
pnpm dev
```

### 3. 開啟瀏覽器

訪問 [http://localhost:3000](http://localhost:3000) 查看你的網站！

## 📁 專案結構

```
/
├── public/                 # 靜態資源
│   ├── models/            # 3D 模型檔案 (GLB/GLTF)
│   ├── spine/             # Spine 動畫檔案
│   ├── textures/          # 材質貼圖
│   └── audio/             # 音效檔案
├── src/
│   ├── app/               # Next.js App Router 頁面
│   │   ├── layout.tsx     # 根布局
│   │   ├── page.tsx       # 首頁 (Landing)
│   │   ├── about/         # 關於我頁面
│   │   ├── experience/    # 經歷頁面
│   │   ├── projects/      # 作品集頁面
│   │   └── contact/       # 聯絡頁面
│   ├── components/        # React 組件
│   │   ├── Character.tsx  # 3D 角色組件
│   │   ├── Scene*.tsx     # 各頁面 3D 場景
│   │   └── ...
│   ├── hooks/             # 自定義 Hooks
│   ├── lib/               # 工具函式
│   └── styles/            # 樣式檔案
└── README.md
```

## 🎯 頁面說明

### 🏠 Landing Page (`/`)
- 3D 籃球場場景
- 可點擊的角色互動
- 動態歡迎文字
- CTA 按鈕導向 About 頁面

### 👨‍💻 About Page (`/about`)
- 互動式時間軸
- 工作和學習經歷
- 動畫進場效果
- 技能標籤展示
- 個人成長歷程

### 🎨 Projects Page (`/projects`)
- 專案網格展示
- 分類過濾功能
- 專案詳情彈窗
- 外部連結導向

### 📬 Contact Page (`/contact`)
- 聯絡表單驗證
- 角色動畫回饋
- 多種聯絡方式
- 表單提交狀態

## 🎮 互動功能

### 角色動畫狀態
- `idle`: 待機呼吸動畫
- `wave`: 揮手問候動畫
- `typing`: 打字輸入動畫

### 3D 場景控制
- **軌道控制**: 滑鼠拖拽旋轉視角
- **點擊互動**: 點擊物件觸發動畫
- **Hover 效果**: 滑鼠懸停顯示提示

## 🛠️ 開發指南

### 添加新的 3D 模型

1. 將 `.glb` 或 `.gltf` 檔案放入 `public/models/`
2. 在組件中使用 `useGLTF` 載入模型：

```tsx
import { useGLTF } from '@react-three/drei'

function MyModel() {
  const { scene } = useGLTF('/models/my-model.glb')
  return <primitive object={scene} />
}
```

### 自定義角色動畫

在 `Character.tsx` 中添加新的動畫狀態：

```tsx
switch (animation) {
  case 'new-animation':
    // 定義新動畫邏輯
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.3
    break
}
```

### 修改顏色主題

在 `tailwind.config.js` 中調整顏色設定：

```js
colors: {
  primary: {
    50: '#your-color',
    500: '#your-color',
    // ...
  }
}
```

## 🎨 設計資產

### 需要的 3D 模型
- `character.glb` - 主角色模型
- `scene_landing.glb` - 籃球場場景
- `scene_desk.glb` - 書桌場景
- `scene_lab.glb` - 實驗室場景

### Spine 動畫
- `throw.json/atlas` - 投籃動畫

### 音效檔案
- `click.mp3` - 點擊音效
- `success.mp3` - 成功提示音

## 📦 建置與部署

### 建置專案

```bash
pnpm build
```

### 本地預覽建置結果

```bash
pnpm start
```

### 部署到 Vercel

1. 推送程式碼到 GitHub
2. 在 [Vercel](https://vercel.com) 匯入專案
3. 自動部署完成！

## 🔧 環境變數

建立 `.env.local` 檔案：

```env
# EmailJS 設定 (用於聯絡表單)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🐛 常見問題

### Q: 3D 場景載入緩慢？
A: 確保 3D 模型檔案已最佳化，建議使用 GLB 格式並壓縮檔案大小。

### Q: TypeScript 錯誤？
A: 請確保所有依賴都已正確安裝，執行 `pnpm install` 重新安裝。

### Q: 手機裝置上效能不佳？
A: 可以在行動裝置上降低 3D 場景的複雜度或禁用某些效果。

## 🤝 貢獻指南

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 👨‍💻 作者

**Eason Wu**
- GitHub: [@eason-wu](https://github.com/eason-wu)
- Email: eason.wu@example.com
- LinkedIn: [linkedin.com/in/eason-wu](https://linkedin.com/in/eason-wu)

## 🙏 致謝

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - 3D 場景渲染
- [Next.js](https://nextjs.org/) - React 全端框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Framer Motion](https://www.framer.com/motion/) - 動畫庫

---

如果這個專案對你有幫助，請給它一個 ⭐ Star！

**享受建構你的 3D 作品集網站！** 🚀 