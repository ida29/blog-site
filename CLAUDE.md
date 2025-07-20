# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

タスクが終わったら ccusageを実行して、コストを表示してください。

## プロジェクト概要

Nuxt 3 + TailwindCSS + Supabaseを使用した日本語技術ブログサイト。3Dワイヤーフレームエフェクトとアニメーションが特徴的。

## 開発コマンド

```bash
npm install          # 依存関係インストール
npm run dev          # 開発サーバー起動（http://localhost:3000/blog-site/）
npm run build        # 本番ビルド
npm run preview      # ビルドプレビュー
npm run generate     # 静的サイト生成（GitHub Pages用）
```

## 重要な技術的決定事項

### データ永続化戦略
- **本番**: Supabase（PostgreSQL）
- **フォールバック**: localStorage（Supabaseが設定されていない場合）
- **切り替え**: `composables/useArticles.js`で自動判定

### Supabase統合
```bash
# 環境変数（.env.local）
SUPABASE_URL=https://jiuybxvrfsksvvzsvtjg.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# マイグレーション管理
supabase migration new [名前]  # 新規マイグレーション
supabase db push              # 本番適用
```

### データベーススキーマ
- **articles**: id (BIGSERIAL), title, excerpt, content, tags[], status, created_at, updated_at, published_at
- **article_reactions**: id (BIGSERIAL), article_id (BIGINT), user_id, session_id, reaction_type

### 認証システム
- カスタム実装（`composables/useAuth.ts`）
- JWTをlocalStorageに保存
- 管理者機能は`/admin`（要認証）

### スタイリング
- TailwindCSS（ローカルインストール、CDNではない）
- ダークモード: Atom One Darkテーマ
- 3Dエフェクト: `assets/css/main.css`にワイヤーフレームアニメーション

### デプロイメント
- GitHub Pages対応（ベースURL: `/blog-site/`）
- 静的生成: `npm run generate`
- `.nojekyll`ファイル自動生成

## 主要なコンポーザブル

- `useArticles()`: 記事CRUD操作（Supabase/localStorage自動切り替え）
- `useAuth()`: 認証管理
- `useReactions()`: いいね機能（localStorage）
- `useSidebar()`: サイドバー開閉管理

## 記事投稿時の注意

1. IDは自動採番（BIGSERIAL）
2. `date`フィールドは送信しない（Supabaseが`created_at`を自動設定）
3. タグは配列形式で保存
4. Markdownサポート（`marked` + `dompurify`でサニタイズ）

## 3Dエフェクトの実装

- ホームページにワイヤーフレーム3Dオブジェクト
- `assets/css/main.css`の`.wireframe-3d`クラス
- パフォーマンスのため`transform`と`opacity`のみ使用

## 重要なファイルパス

- 記事投稿: `pages/articles/new.vue`
- 記事一覧: `pages/articles/index.vue`
- 3Dエフェクト: `assets/css/main.css`
- Supabaseマイグレーション: `supabase/migrations/`