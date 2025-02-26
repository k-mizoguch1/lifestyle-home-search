# ライフスタイル提案機能付き物件検索アプリ（仮称）

## 使用技術

- フロントエンド

  - [Next.js](https://nextjs.org/)
  - [npm](https://www.npmjs.com/)
  - [Node.js](https://nodejs.org/ja) v22.6.0

- バックエンド

  - [Nest.js](https://nestjs.com/)
  - [PostgreSQL](https://www.postgresql.org/)

- デザイン

  - [Figma](https://www.figma.com/)

- 言語

  - [TypeScript](https://www.typescriptlang.org/)

- コードフォーマット

  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)

- CI/CD

  - [GitHub Actions](https://github.com/features/actions)

- IDE
  - [VSCode](https://code.visualstudio.com/download)

---

## 事前準備

各種ツールのインストール

- [VSCode](https://code.visualstudio.com/download)
- Git
  - [windows](https://qiita.com/T-H9703EnAc/items/4fbe6593d42f9a844b1c)
  - [mac](https://zenn.dev/mesgory/articles/948876ac1b7517)
- Node.js
  - [windows](https://qiita.com/echolimitless/items/83f8658cf855de04b9ce)
  - macはHomebrewで
- [Docker](https://docs.docker.com/get-started/get-docker/)

Windowsユーザ

- [wsl](https://qiita.com/zakoken/items/61141df6aeae9e3f8e36)
  ※ WindowsユーザーがLinuxコマンドを使用する方法として、WSL2、Git Bash、Cygwin などの選択肢があります。本格的な開発環境が必要な場合は WSL2 を推奨しますが、基本的なLinuxコマンドを使うだけなら Git Bash でも十分です。

---

# 開発手順

## 1. リポジトリをクローン

```bash
git clone https://github.com/k-mizoguch1/lifestyle-home-search.git
```

## 2. パッケージのインストール（フロントエンド）

```bash
npm install
```

## 3. サーバーの起動（フロントエンド）

```bash
npm run dev
```

アプリは [http://localhost:3000](http://localhost:3000) で起動します。

## 4. ブランチを作成・切り替え

```bash
git checkout -b {ブランチ名}
```

- ここで開発を進めます。

## 5. コードフォーマッターを使用する

```bash
npm run lint  # Lintチェックのみ
npm run fix   # Lint & Prettier の自動修正
```

## 6. ステージング（変更の追加）

```bash
git add .
```

## 7. コミット（ローカルブランチに変更を反映）

```bash
git commit -m '{feat or fix}: {変更の概要}'
```

## 8. プッシュ（リモートブランチに変更を反映）

```bash
git push -u origin {ブランチ名}
```

## 9. プルリクエスト作成（GitHub上で実施）

GitHubのGUI上で、リモートブランチから `main` ブランチへのプルリクエストを作成します。

---

# ブランチ命名規則

ブランチの名前は、作業内容が明確になるように以下のルールに従って命名してください。

## 1. 新規機能追加

```bash
feature/{機能名}
```

**例**: ヘッダーコンポーネントの追加 → `feature/add-header-component`

## 2. 機能修正・不具合修正

```bash
fix/{修正内容}
```

**例**: ヘッダーの背景色の変更 → `fix/change-header-background-color`

## 3. リファクタリング

```bash
ref/{リファクタリング内容}
```

**例**: コードの整理 → `ref/cleanup-header-component`

---

# アプリ構成

![シーケンス図](https://github.com/k-mizoguch1/lifestyle-home-search/blob/main/public/drawio/lifestyle-home-search-sequence.drawio.svg)

---

# 開発メンバー

チーム名:たぐちだぶち

- フロントエンド
  - gody012
  - nakatari04
  - k-mizoguch1
  - rikuto0507
- バックエンド
  - Tatsu821
