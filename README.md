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
- テスト
  - [Jest](https://jestjs.io/)
  - [Playwright](https://playwright.dev/)
- IDE
  - [VSCode](https://code.visualstudio.com/download)

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

## 開発手順

1. リポジトリをクローン

```bash
git clone https://github.com/k-mizoguch1/lifestyle-home-search.git
```

※ 今後ここから先はDocker上で全て起動するように変更予定(時間が許せば)

2. パッケージのインストール(フロント)

```bash
npm install
```

3. サーバーの起動(フロント)

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)で起動します．

コードフォーマッターを使用する

```bash
npm run lint # Lintチェックのみ
npm run fix
```

## アプリ構成

![シーケンス図]()

### 開発メンバー

- フロントエンド
  - gody012
  - nakatari04
  - k-mizoguch1
- バックエンド
  - Tatsu821
