# サンプルデータの削除方法

## 方法1: ブラウザの開発者ツールから削除（推奨）

1. ブラウザでサイトを開く: http://localhost:3003/blog-site/
2. F12キーで開発者ツールを開く
3. Consoleタブに移動
4. 以下のコマンドを実行:

```javascript
// サンプル記事をすべて削除
localStorage.removeItem('articles')
// 初期化フラグもリセット  
localStorage.removeItem('sampleDataInitialized')
// ページをリロード
location.reload()
```

## 方法2: UIから削除（要ログイン）

1. `/auth/login` または `/auth/signup` でアカウント作成・ログイン
2. 記事一覧ページ (`/articles`) で各記事の「削除」ボタンをクリック
3. または記事詳細ページで「削除」ボタンをクリック

### 削除ボタンが表示されない場合

- ログインしているかConfirm: 右上にユーザー情報やログアウトボタンが表示されているか
- 開発者ツールのConsoleで認証状態を確認:

```javascript
// 認証状態を確認
console.log('User:', localStorage.getItem('user'))
console.log('Articles:', localStorage.getItem('articles'))
```

## 現在のサンプル記事

初期状態では以下の3つの記事があります：

1. "Nuxt.js 3とTailwindCSSで作るモダンなブログサイト" (ID: 1)
2. "TypeScriptで型安全なAPIクライアントを実装する" (ID: 2)  
3. "Vue 3 Composition APIでより良いコードを書く" (ID: 3)