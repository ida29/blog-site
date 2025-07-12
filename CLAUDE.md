タスクが終わったら ccusageを実行して、コストを表示してください。

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このプロジェクトはNuxt.js 3とTailwindCSSを使用したモダンなブログサイトです。記事の投稿、閲覧、検索機能を提供します。

## 開発コマンド

### セットアップ
```bash
npm install
```

### 開発サーバー（ポート3000）
```bash
npm run dev
```

### 本番用ビルド
```bash
npm run build
```

### 本番プレビュー
```bash
npm run preview
```

### 静的サイト生成
```bash
npm run generate
```

## アーキテクチャ

### ページ構成
- `pages/index.vue` - ホームページ（ヒーローセクション、特徴紹介、最新記事）
- `pages/articles/index.vue` - 記事一覧ページ（検索・フィルター機能付き）
- `pages/articles/new.vue` - 記事投稿ページ（プレビュー機能、下書き保存）
- `pages/articles/[id].vue` - 個別記事ページ

### コンポーネント構成
- `layouts/default.vue` - 基本レイアウト（Header + main + Footer）
- `components/Header.vue` - ナビゲーションヘッダー（レスポンシブメニュー）
- `components/Footer.vue` - フッター

### データ管理
- 現在はlocalStorageを使用してデータを永続化
- 記事データは`articles`キーに配列として保存
- 下書きは`drafts`キーに保存
- 将来的にはAPIベースのバックエンドへの移行を想定

### スタイリング
- TailwindCSSをCDN経由で読み込み
- レスポンシブデザイン対応
- カラーパレット：blue-600をメインカラーとして使用
- グラデーション背景（blue-600 to purple-600）

### 機能的特徴
- 記事の検索・タグフィルター・ソート機能
- リアルタイムプレビュー機能
- 下書き保存機能
- レスポンシブナビゲーション

### 日本語対応
- 全てのUI要素が日本語
- 日本語の日付フォーマット（`toLocaleDateString('ja-JP')`）
- サイトタイトル：「モダンブログサイト」

## 重要な設定

### Nuxt設定（nuxt.config.ts）
- Nuxt DevTools有効
- サイトメタデータは日本語で設定済み
- TailwindCSSはCDNから読み込み

### TypeScript
- TypeScriptサポート有効
- 型安全性を重視した開発

## 新機能追加時の注意点

1. 記事データ構造：
   ```javascript
   {
     id: number,
     title: string,
     excerpt: string,
     content: string,
     tags: string[],
     date: string, // YYYY-MM-DD format
     status: 'published' | 'draft'
   }
   ```

2. ローカルストレージキー：
   - `articles` - 投稿済み記事
   - `drafts` - 下書き記事

3. TailwindCSSクラスの一貫性を保つ
4. レスポンシブデザインを考慮（md:, lg:プレフィックス使用）
5. 日本語UIの一貫性を保つ
