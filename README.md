# yidaのtechブログ

3Dワイヤーフレームエフェクトが特徴的な、モダンな技術ブログサイトです。

🌐 **デモサイト**: [https://ida29.github.io/blog-site/](https://ida29.github.io/blog-site/)

![Blog Site Preview](https://github.com/ida29/blog-site/assets/26829774/preview-image.png)

## 🚀 特徴

- ✨ **3Dワイヤーフレームエフェクト** - CSSのみで実装された軽量な3Dアニメーション
- 📝 **Markdownサポート** - 記事をMarkdown形式で執筆、リアルタイムプレビュー付き
- 🎨 **ダークモード対応** - システム設定に連動した自動切り替え
- 📱 **レスポンシブデザイン** - モバイルからデスクトップまで最適化
- 🔍 **記事検索・タグフィルター** - 効率的なコンテンツ探索
- ⚡ **高速な静的サイト生成** - GitHub Pagesに最適化
- 🔐 **管理者機能** - 記事の編集・削除（管理者のみ）

## 🛠️ 技術スタック

- **フレームワーク**: [Nuxt 3](https://nuxt.com/) - Vue.js 3ベースのモダンなフレームワーク
- **スタイリング**: [TailwindCSS](https://tailwindcss.com/) - ユーティリティファーストCSS
- **データベース**: [Supabase](https://supabase.com/) - PostgreSQLベースのBaaS
- **Markdownパーサー**: [marked](https://marked.js.org/) + [DOMPurify](https://github.com/cure53/DOMPurify) - 安全なMarkdownレンダリング
- **ホスティング**: [GitHub Pages](https://pages.github.com/) - 無料の静的サイトホスティング

## 📦 セットアップ

### 必要な環境

- Node.js 18以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/ida29/blog-site.git
cd blog-site

# 依存関係をインストール
npm install
```

### 環境変数の設定

`.env`ファイルを作成し、Supabaseの接続情報を設定します：

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

> 注: Supabaseを設定しない場合、自動的にLocalStorageにフォールバックされます。

### データベースセットアップ（Supabase使用時）

```bash
# Supabase CLIでマイグレーションを実行
supabase db push

# または、Supabaseダッシュボードで以下のSQLを実行
-- supabase/migrations/xxx_create_tables.sql を参照
```

## 🚀 開発

```bash
# 開発サーバーを起動（http://localhost:3000）
npm run dev

# 本番用ビルド
npm run build

# ビルドのプレビュー
npm run preview

# 静的サイト生成（GitHub Pages用）
npm run generate
```

## 📁 プロジェクト構造

```
blog-site/
├── assets/          # スタイルシート
├── components/      # Vueコンポーネント
│   ├── Header.vue   # ナビゲーションヘッダー
│   ├── Footer.vue   # フッター
│   └── ...
├── composables/     # 再利用可能なロジック
│   ├── useArticles.js    # 記事管理
│   ├── useAuth.js        # 認証
│   └── useReactions.ts   # リアクション機能
├── layouts/         # レイアウトテンプレート
├── middleware/      # ルートミドルウェア
├── pages/           # ページコンポーネント
│   ├── index.vue    # ホームページ
│   ├── articles/    # 記事関連ページ
│   └── auth/        # 認証ページ
├── public/          # 静的ファイル
└── supabase/        # データベースマイグレーション
```

## ✨ 主要機能の詳細

### 3Dワイヤーフレームエフェクト

純粋なCSS3Dトランスフォームで実装された、パフォーマンスに優れた3Dアニメーション。WebGLは使用していないため、どのデバイスでも軽快に動作します。

### 記事管理システム

- **作成**: Markdownエディタでリアルタイムプレビューを見ながら執筆
- **編集**: モーダルUIで記事詳細ページから直接編集
- **削除**: 確認ダイアログ付きの安全な削除機能
- **下書き保存**: 執筆途中の記事を保存

### レスポンシブデザイン

TailwindCSSのレスポンシブユーティリティを活用し、モバイルファーストで設計。画面サイズに応じて最適なレイアウトを提供します。

## 🚢 デプロイ（GitHub Pages）

1. GitHub Actionsを使用した自動デプロイ:
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   ```

2. 手動デプロイ:
   ```bash
   npm run generate
   # .output/public の内容をgh-pagesブランチにプッシュ
   ```

## 🤝 コントリビューション

Issue、プルリクエスト、大歓迎です！

## 📄 ライセンス

MIT License

## 👤 作者

**yida**
- GitHub: [@ida29](https://github.com/ida29)
- Blog: [https://ida29.github.io/blog-site/](https://ida29.github.io/blog-site/)

---

このプロジェクトは、技術的な学びを発信し、開発スキルを向上させることを目的として作成されました。