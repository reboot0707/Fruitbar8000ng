# Fruitbar8000ng

Fruitbar8000ng 採用 Angular 作為前端框架，第一階段主要將既有 MVC + Bootstrap 的互動作業流程與排版樣式移植至 Angular。POC（概念驗證）目標是驗證 Angular 與 Ajax 的基礎特性，包含元件、路由、資料繫結、表單操作，以及透過 HTTP API 完成資料查詢與新增、修改、刪除。

移植以延續既有頁面配置、操作順序與 Bootstrap 樣式為主，讓熟悉原有 MVC 介面的使用者沿用既有操作方式，並藉此確認 Angular 前端與後端 API 的整合方式。

## 第一階段 POC 目標

- 以 Angular 元件組織頁面及共用頁首、頁尾，透過路由切換管理頁面。
- 驗證資料繫結與表單輸入，銜接既有的查詢、新增、編輯與刪除流程。
- 透過 Angular `HttpClient` 進行 Ajax 非同步請求，驗證 API 資料讀寫與畫面更新。
- 移植既有 MVC 排版及 Bootstrap 互動，確認在 Angular 頁面中的呈現與操作。

以上為本階段驗證範圍；目前已有下列實作，實際操作結果仍需搭配後端 API 驗證。

## 目前實作

| 功能 | 頁面路由 | API 路徑 |
| --- | --- | --- |
| 藝人管理 | `/artists`、`/artists/create`、`/artists/edit/:id` | `/apis/v2/artists` |
| 專輯管理 | `/albums`、`/albums/create`、`/albums/edit/:id` | `/apis/v2/albums` |
| 樂曲管理 | `/gallery`、`/gallery/create`、`/gallery/edit/:id` | `/apis/v2/gallery/songs` |

各管理功能已有列表、新增與編輯頁面，以及查詢、新增、修改、刪除的 service 方法。另外包含首頁、隱私權頁面及共用頁首、頁尾。

全域樣式由 `src/styles.css` 引入 Bootstrap CSS，以及移植的 `mvcsite.css`、`mvclayout.css`；Bootstrap JavaScript bundle 則由 `angular.json` 載入。

## 開發環境

| 項目 | 專案設定 |
| --- | --- |
| 前端框架 | Angular 22、Angular CLI 22 |
| 排版與互動 | Bootstrap 5.3 |
| 語言 | TypeScript 6.0 |
| 非同步資料處理 | Angular HttpClient、RxJS 7.8 |
| 單元測試 | Vitest 4、jsdom |
| 套件管理 | npm 11.19.0（依 `package.json` 的 `packageManager`） |

依目前 `package-lock.json` 中 Angular 套件的 `engines`，Node.js 相容條件為 `^22.22.3 || ^24.15.0 || >=26.0.0`。本專案建議使用 **Node.js 24.15.0 以上的 24.x**，並將 npm 版本對齊 **11.19.0**。實際套件版本以 lockfile 為準。

先安裝 Node.js 與 npm，再確認版本：

```bash
node --version
npm --version
```

## 安裝與啟動

在專案根目錄執行：

```bash
npm ci
npm start
```

`npm ci` 依 `package-lock.json` 安裝相依套件。開發伺服器啟動後，開啟 `http://localhost:4200/`；修改原始碼後會自動重新載入。

`npm start` 等同使用專案內的 Angular CLI 執行：

```bash
npx ng serve
```

文件預設透過 npm scripts 或 `npx` 使用已安裝於專案的 CLI，不需另外安裝全域 Angular CLI。若要直接執行 `ng serve` 或 `ng build`，需確保相容的 `ng` 指令已在 PATH 中。

## 後端 API 與開發代理

資料操作需要另行啟動後端 API；`npm start` 只啟動前端。後端的啟動方式請依後端專案設定操作。

目前 `src/environments/environment.development.ts` 設定 API 前綴：

```typescript
export const environment = {
  endpointUrl: '/apis/v2'
};
```

`endpointUrl` 結尾不加斜線，由各 service 接續資源路徑。開發伺服器透過 `angular.json` 載入 `proxy.conf.json`，目前代理設定為：

```json
{
  "/apis": {
    "target": "http://localhost:2486",
    "secure": false,
    "changeOrigin": true
  }
}
```

此設定用於將前端 API 請求轉送至本機後端，保留 `/apis/v2/...` 路徑。若後端主機或連接埠不同，請調整 `proxy.conf.json` 的 `target`，並重新啟動開發伺服器；若 API 前綴不同，也需同步調整 `endpointUrl` 與代理比對路徑。

## 建置與常用指令

| 用途 | 指令 |
| --- | --- |
| 安裝 lockfile 指定的相依套件 | `npm ci` |
| 啟動開發伺服器 | `npm start` 或 `npx ng serve` |
| 正式建置 | `npm run build` 或 `npx ng build` |
| 開發組態建置 | `npx ng build --configuration development` |
| 監看變更並持續執行開發建置 | `npm run watch` |
| 執行單元測試 | `npm test` |
| 單次執行單元測試 | `npm test -- --watch=false` |
| 產生元件 | `npx ng generate component components/example` |

`ng build` 預設使用 `production` 組態，啟用正式建置最佳化與檔名雜湊，產物位於 `dist/` 下。`development` 組態關閉最佳化並產生 source map，方便除錯。`npm run watch` 只持續建置，不會啟動開發伺服器。

單元測試使用 Angular 的 unit-test builder 搭配 Vitest。專案目前未配置端對端（e2e）測試工具。

## 專案結構

```text
src/
├── app/
│   ├── components/       # 首頁、藝人、專輯、樂曲及隱私權頁面
│   ├── share/components/ # 共用頁首與頁尾
│   ├── services/         # HTTP API 資料存取
│   ├── interfaces/       # 資料型別定義
│   ├── app.routes.ts     # 頁面路由
│   └── app.config.ts     # 應用程式 providers 設定
├── environments/         # 環境與 API 前綴設定
├── styles/               # 移植的 mvcsite.css、mvclayout.css
└── styles.css            # 全域樣式入口
public/                   # 圖片等靜態資源
angular.json              # 開發、建置與測試設定
proxy.conf.json           # 本機開發 API 代理
```

## 環境設定與部署現況

目前各 API service 直接引用 `environment.development.ts`，而 `environment.ts` 仍為空物件。雖然 `angular.json` 已設定開發組態的檔案替換，直接引用開發環境檔案的 service 並不會因此在正式建置時切換設定；目前正式建置仍會使用 `/apis/v2`。

開發伺服器的代理設定不會隨建置產物部署。正式部署時，需由網站伺服器或反向代理將 `/apis` 請求轉送至後端；若需使用不同 API 位址，須先完善環境設定及 service 的引用方式。網站伺服器也需支援 Angular 路由回退至 `index.html`，讓直接開啟或重新整理管理頁面時能正常載入。
