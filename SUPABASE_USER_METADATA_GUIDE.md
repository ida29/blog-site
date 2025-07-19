# Supabase User Metadata 設定ガイド

このガイドでは、Supabaseでユーザーのメタデータ（特に管理者権限）を設定する方法を説明します。

## 1. SQL コマンドを使用した直接更新

### 1.1 Supabase SQL Editor を使用

1. Supabase Dashboard にログイン
2. プロジェクトを選択
3. 左サイドバーの「SQL Editor」をクリック
4. 以下のSQLクエリを実行

#### app_metadata に admin ロールを設定

```sql
-- 特定のユーザーに admin ロールを設定
UPDATE auth.users 
SET raw_app_meta_data = jsonb_set(
    COALESCE(raw_app_meta_data, '{}'::jsonb),
    '{role}',
    '"admin"'
)
WHERE email = 'user@example.com';  -- メールアドレスで特定

-- または、ユーザーIDで特定
UPDATE auth.users 
SET raw_app_meta_data = jsonb_set(
    COALESCE(raw_app_meta_data, '{}'::jsonb),
    '{role}',
    '"admin"'
)
WHERE id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';  -- UUIDを入力
```

#### user_metadata に admin ロールを設定

```sql
-- user_metadata を更新（ユーザー自身が変更可能）
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{role}',
    '"admin"'
)
WHERE email = 'user@example.com';
```

#### 複数の属性を同時に設定

```sql
-- 複数のメタデータを一度に設定
UPDATE auth.users 
SET raw_app_meta_data = jsonb_set(
    jsonb_set(
        COALESCE(raw_app_meta_data, '{}'::jsonb),
        '{role}',
        '"admin"'
    ),
    '{permissions}',
    '["read", "write", "delete"]'::jsonb
)
WHERE email = 'user@example.com';
```

### 1.2 現在のメタデータを確認

```sql
-- ユーザーのメタデータを確認
SELECT 
    id,
    email,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at
FROM auth.users
WHERE email = 'user@example.com';

-- 全管理者ユーザーを表示
SELECT 
    id,
    email,
    raw_app_meta_data->>'role' as role
FROM auth.users
WHERE raw_app_meta_data->>'role' = 'admin';
```

## 2. Supabase Dashboard を使用した更新

### 2.1 Authentication タブから更新

1. Supabase Dashboard にログイン
2. プロジェクトを選択
3. 左サイドバーの「Authentication」をクリック
4. 「Users」タブを選択
5. 編集したいユーザーを見つける
6. ユーザー行の右端にある「...」メニューをクリック
7. 「Edit user」を選択
8. 「User metadata」または「App metadata」セクションでJSONを編集

#### メタデータの例

```json
{
  "role": "admin",
  "permissions": ["read", "write", "delete"],
  "department": "IT"
}
```

## 3. Supabase Admin API を使用

### 3.1 Service Role Key を使用した更新

```javascript
// JavaScript/TypeScript の例
import { createClient } from '@supabase/supabase-js'

// Service Role Key を使用（サーバーサイドのみ）
const supabase = createClient(
  'https://your-project.supabase.co',
  'your-service-role-key', // ダッシュボードの Settings > API から取得
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// ユーザーメタデータを更新
async function updateUserMetadata(userId, metadata) {
  const { data, error } = await supabase.auth.admin.updateUserById(
    userId,
    {
      app_metadata: { role: 'admin' },
      user_metadata: { display_name: 'Admin User' }
    }
  )
  
  if (error) {
    console.error('Error updating user:', error)
  } else {
    console.log('User updated:', data)
  }
}
```

### 3.2 cURL を使用した API 呼び出し

```bash
# ユーザーメタデータを更新
curl -X PUT 'https://your-project.supabase.co/auth/v1/admin/users/{user-id}' \
  -H "apikey: your-service-role-key" \
  -H "Authorization: Bearer your-service-role-key" \
  -H "Content-Type: application/json" \
  -d '{
    "app_metadata": {
      "role": "admin"
    }
  }'
```

## 4. RLS (Row Level Security) での活用

### 4.1 app_metadata を使用した RLS ポリシー

```sql
-- 管理者のみがアクセスできるポリシー
CREATE POLICY "Admin only access" ON public.sensitive_data
FOR ALL 
TO authenticated
USING (
  (auth.jwt() -> 'app_metadata' ->> 'role')::text = 'admin'
);

-- 自分のデータまたは管理者がアクセスできるポリシー
CREATE POLICY "User or admin access" ON public.user_data
FOR ALL 
TO authenticated
USING (
  auth.uid() = user_id 
  OR (auth.jwt() -> 'app_metadata' ->> 'role')::text = 'admin'
);
```

## 5. アプリケーションでの確認方法

### 5.1 JavaScript/TypeScript

```javascript
// 現在のユーザーのメタデータを取得
const { data: { user } } = await supabase.auth.getUser()

// app_metadata の確認（サーバーサイドのみ）
const isAdmin = user?.app_metadata?.role === 'admin'

// user_metadata の確認
const displayName = user?.user_metadata?.display_name
```

### 5.2 JWT トークンでの確認

```javascript
// JWTトークンをデコードして確認
const { data: { session } } = await supabase.auth.getSession()
if (session) {
  // JWTペイロードを確認
  const token = session.access_token
  // app_metadata は JWT に含まれる
  // user_metadata は含まれない
}
```

## 重要な注意事項

1. **app_metadata vs user_metadata**
   - `app_metadata`: システム管理者のみ変更可能、JWT に含まれる、権限管理に適している
   - `user_metadata`: ユーザー自身も変更可能、JWT に含まれない、プロフィール情報に適している

2. **セキュリティ**
   - Service Role Key は絶対にクライアントサイドで使用しない
   - 権限管理には必ず `app_metadata` を使用する

3. **更新の反映**
   - メタデータの更新後、ユーザーは再ログインが必要な場合がある
   - JWT トークンの更新には時間がかかる場合がある

## トラブルシューティング

### メタデータが更新されない場合

1. SQLクエリの実行権限を確認
2. Service Role Key が正しいか確認
3. ユーザーIDまたはメールアドレスが正しいか確認

### RLS ポリシーが機能しない場合

1. JWT トークンが最新か確認（再ログインを試す）
2. ポリシーの構文を確認
3. `auth.jwt()` 関数が正しく機能しているか確認

```sql
-- デバッグ用：現在のJWTの内容を確認
SELECT auth.jwt();
```