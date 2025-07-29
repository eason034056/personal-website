# 🚀 使用指引 - 3D 個人網站

## 📋 立即開始使用

### 1. 安裝所有依賴

```bash
# 使用 npm (需要 Node.js 18+ 版本)
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm (推薦，速度更快)
pnpm install
```

### 2. 啟動開發伺服器

```bash
# 使用對應的包管理器
npm run dev
# 或
yarn dev  
# 或
pnpm dev
```

### 3. 打開瀏覽器

前往 [http://localhost:3000](http://localhost:3000) 就能看到你的 3D 個人網站了！

## 🎮 網站功能介紹

### 🏠 首頁 (Landing Page)
- **3D 籃球場場景**：背景是一個 3D 籃球場
- **可點擊角色**：點擊中央的 3D 角色會播放揮手動畫
- **浮動籃球**：場景中有一顆會上下浮動的籃球
- **CTA 按鈕**：點擊「開始探索」按鈕會導向關於我頁面

### 👨‍💻 關於我頁面 (/about)
- **3D 書桌場景**：一個逼真的 3D 書桌環境
- **互動物件**：點擊書桌上的筆電、書本、咖啡、植物會顯示相關資訊
- **個人資訊卡片**：右側顯示個人簡介和技能標籤
- **Hover 效果**：滑鼠懸停在物件上會有發光效果

### 📈 經歷頁面 (/experience)
- **時間軸設計**：以卡片形式展示工作和學習經歷
- **動畫進場**：捲動頁面時卡片會依序淡入
- **分類標籤**：工作、教育、專案用不同顏色區分
- **技能展示**：每個經歷都有相關技能標籤

### 🎨 作品集頁面 (/projects)
- **專案網格**：以卡片網格方式展示作品
- **分類過濾**：可以按照 Web、3D、Mobile、Game 分類篩選
- **專案詳情**：點擊專案卡片會開啟詳細資訊彈窗
- **外部連結**：每個專案都有 Demo 和 GitHub 連結

### 📬 聯絡頁面 (/contact)
- **聯絡表單**：包含姓名、信箱、主旨、訊息欄位
- **表單驗證**：使用 Yup 進行即時表單驗證
- **角色回饋**：輸入時角色會顯示「打字」狀態
- **聯絡資訊**：左側顯示多種聯絡方式

## 🎯 互動說明

### 角色互動
- **待機狀態**：角色會有輕微的呼吸動畫
- **點擊互動**：點擊角色會播放揮手動畫
- **表單互動**：在聯絡頁面輸入時角色會顯示打字狀態

### 3D 場景控制
- **滑鼠拖拽**：可以旋轉 3D 場景視角
- **滾輪縮放**：某些場景支援縮放功能
- **點擊互動**：點擊場景中的物件會觸發動畫或顯示資訊

## 🛠️ 客製化說明

### 修改個人資訊

#### 1. 更新導航列名稱
編輯 `src/app/layout.tsx`：
```tsx
<h1 className="text-xl font-bold text-primary-600">
  你的名字  {/* 原本是 Eason Wu */}
</h1>
```

#### 2. 修改首頁歡迎文字
編輯 `src/app/page.tsx`：
```tsx
<h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in">
  Hello, I'm <span className="text-primary-300">你的名字</span>
</h1>
```

#### 3. 更新關於我資訊
編輯 `src/app/about/page.tsx` 中的個人資訊卡片：
```tsx
<h2 className="text-xl font-bold text-gray-800">你的名字</h2>
<p className="text-gray-600">你的職稱</p>
// 修改技能標籤陣列
{['你的技能1', '你的技能2', '你的技能3'].map((tech) => (
  // ...
))}
```

#### 4. 修改經歷資料
編輯 `src/components/Timeline.tsx` 中的 `timelineData` 陣列，替換成你的真實經歷。

#### 5. 更新專案資料
編輯 `src/components/ProjectGrid.tsx` 中的 `projects` 陣列，加入你的真實專案。

#### 6. 修改聯絡資訊
編輯 `src/app/contact/page.tsx` 中的聯絡方式：
```tsx
<p className="text-gray-600">你的信箱@example.com</p>
<p className="text-gray-600">linkedin.com/in/你的linkedin</p>
<p className="text-gray-600">github.com/你的github</p>
```

### 修改顏色主題

編輯 `tailwind.config.js`：
```js
colors: {
  primary: {
    50: '#你喜歡的淺色',
    100: '#你喜歡的淺色',
    500: '#你喜歡的主色',
    600: '#你喜歡的深色',
    700: '#你喜歡的深色',
  }
}
```

## 🎨 添加真實 3D 模型

目前網站使用簡單的幾何體作為 3D 角色，你可以替換成真實的 3D 模型：

### 1. 準備 3D 模型
- 格式：GLB 或 GLTF（推薦 GLB）
- 大小：建議小於 5MB
- 優化：使用 [glTF Pipeline](https://github.com/CesiumGS/gltf-pipeline) 壓縮

### 2. 放置模型檔案
```
public/
├── models/
│   ├── character.glb        # 主角色
│   ├── scene_landing.glb    # 籃球場場景
│   ├── scene_desk.glb       # 書桌場景
│   └── scene_lab.glb        # 實驗室場景
```

### 3. 載入模型
在 `src/components/Character.tsx` 中啟用這行程式碼：
```tsx
const { scene, animations } = useGLTF('/models/character.glb')
// 然後註解掉現有的幾何體程式碼
return <primitive object={scene} />
```

## 📧 設定聯絡表單

為了讓聯絡表單能真正發送郵件，你需要設定 EmailJS：

### 1. 註冊 EmailJS
前往 [EmailJS](https://www.emailjs.com/) 註冊並設定服務

### 2. 建立環境變數檔案
建立 `.env.local`：
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=你的服務ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=你的範本ID  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=你的公開金鑰
```

### 3. 在聯絡表單中啟用
編輯 `src/components/ContactForm.tsx`，找到這行並取消註解：
```tsx
// await emailjs.send('service_id', 'template_id', data, 'public_key')
```

## 🚀 部署到生產環境

### 建置專案
```bash
pnpm build
```

### 部署到 Vercel（推薦）
1. 將程式碼推送到 GitHub
2. 在 [Vercel](https://vercel.com) 匯入你的 GitHub 專案
3. 設定環境變數（如果有用到 EmailJS）
4. 點擊部署！

### 部署到其他平台
- **Netlify**: 拖拽 `out` 資料夾到 Netlify
- **GitHub Pages**: 使用 GitHub Actions 自動部署
- **自己的伺服器**: 上傳建置後的檔案

## ❓ 常見問題

### Q: 看不到 3D 場景？
A: 確保瀏覽器支援 WebGL，並且沒有被廣告攔截器阻擋。

### Q: 網站載入很慢？
A: 3D 模型檔案較大是正常的，可以考慮：
- 壓縮 3D 模型
- 添加載入進度條
- 使用較簡單的幾何體

### Q: 在手機上效能不好？
A: 可以檢測裝置類型，在行動裝置上顯示簡化版本。

### Q: TypeScript 錯誤？
A: 這些錯誤會在安裝依賴後自動解決，如果持續出現請檢查 Node.js 版本。

## 🎉 完成！

現在你已經有了一個功能完整的 3D 個人網站！

記得：
- ✅ 修改成你的個人資訊
- ✅ 替換成你的真實專案
- ✅ 加入你的 3D 模型（可選）
- ✅ 設定聯絡表單（可選）
- ✅ 部署到網路上分享給大家！

**祝你建構出令人驚豔的個人網站！** 🚀✨ 