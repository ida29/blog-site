// サンプルデータの初期化
export const useInitSampleData = () => {
  // SSR中かどうかをチェック
  const isClient = process.client
  const initSampleArticles = () => {
    // SSR中は何もしない
    if (!isClient) return
    
    // すでに記事が存在する場合は何もしない
    const existingArticles = localStorage.getItem('articles')
    if (existingArticles && JSON.parse(existingArticles).length > 0) {
      return
    }

    // サンプル記事データ
    const sampleArticles = [
      {
        id: 1,
        title: 'Nuxt.js 3とTailwindCSSで作るモダンなブログサイト',
        excerpt: 'Nuxt.js 3とTailwindCSSを使用して、レスポンシブでモダンなブログサイトを構築する方法を解説します。',
        content: `本記事では、Nuxt.js 3とTailwindCSSを使用してモダンなブログサイトを構築する方法について解説します。

## なぜNuxt.js 3を選ぶのか

Nuxt.js 3は、Vue.js 3をベースにした強力なフレームワークです。以下のような特徴があります：

1. **高速なパフォーマンス**: Viteによる高速な開発体験
2. **TypeScriptサポート**: 型安全な開発が可能
3. **Auto Import**: コンポーネントやコンポジションAPIの自動インポート
4. **ハイブリッドレンダリング**: SSR、SPA、SSGを柔軟に選択可能

## TailwindCSSの利点

TailwindCSSは、ユーティリティファーストのCSSフレームワークです：

- カスタムCSSを書く必要が最小限
- レスポンシブデザインが簡単
- ダークモード対応が容易
- ビルド時の最適化で軽量

## 実装のポイント

### 1. プロジェクトのセットアップ

\`\`\`bash
npx nuxi@latest init blog-site
cd blog-site
npm install
\`\`\`

### 2. TailwindCSSの導入

CDN経由で簡単に導入できます。nuxt.config.tsに以下を追加：

\`\`\`typescript
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        { src: 'https://cdn.tailwindcss.com' }
      ]
    }
  }
})
\`\`\`

### 3. ページ構成

- \`pages/index.vue\`: ホームページ
- \`pages/articles/index.vue\`: 記事一覧
- \`pages/articles/[id].vue\`: 記事詳細
- \`pages/articles/new.vue\`: 記事投稿

### 4. データ管理

開発段階ではlocalStorageを使用し、本番環境ではSupabaseなどのBaaSへの移行を想定します。

## まとめ

Nuxt.js 3とTailwindCSSの組み合わせにより、開発効率と保守性の高いブログサイトを構築できます。`,
        tags: ['Nuxt.js', 'TailwindCSS', 'Vue.js', 'Web開発'],
        date: '2024-01-15',
        status: 'published',
        created_at: '2024-01-15T10:00:00.000Z',
        published_at: '2024-01-15T10:00:00.000Z'
      },
      {
        id: 2,
        title: 'TypeScriptで型安全なAPIクライアントを実装する',
        excerpt: 'TypeScriptを使用して、型安全性を保ちながら柔軟なAPIクライアントを実装する方法を紹介します。',
        content: `APIとの通信において型安全性を保つことは、バグの削減と開発効率の向上につながります。

## 型安全なAPIクライアントの必要性

JavaScriptでAPIを扱う際の問題点：
- レスポンスの型が不明確
- タイポによるエラー
- APIの変更に気づきにくい

TypeScriptを使用することで、これらの問題を解決できます。

## 実装例

### 1. APIレスポンスの型定義

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}
\`\`\`

### 2. APIクライアントクラス

\`\`\`typescript
class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`)
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`)
    }
    return response.json()
  }

  async post<T, U>(endpoint: string, data: U): Promise<ApiResponse<T>> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`)
    }
    return response.json()
  }
}
\`\`\`

### 3. 使用例

\`\`\`typescript
const api = new ApiClient('https://api.example.com')

// 型安全なAPIコール
const userResponse = await api.get<User>('/users/1')
console.log(userResponse.data.name) // 型補完が効く

// POSTリクエスト
const newUser = await api.post<User, Omit<User, 'id' | 'createdAt'>>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
})
\`\`\`

## まとめ

TypeScriptを使用することで、APIクライアントの型安全性を確保し、開発効率を大幅に向上させることができます。`,
        tags: ['TypeScript', 'API', 'Web開発'],
        date: '2024-01-10',
        status: 'published',
        created_at: '2024-01-10T10:00:00.000Z',
        published_at: '2024-01-10T10:00:00.000Z'
      },
      {
        id: 3,
        title: 'Vue 3 Composition APIでより良いコードを書く',
        excerpt: 'Vue 3のComposition APIを使用して、再利用可能で保守性の高いコードを書く方法を解説します。',
        content: `Vue 3で導入されたComposition APIは、コンポーネントロジックをより柔軟に構成できる新しい方法です。

## Composition APIの利点

1. **ロジックの再利用性向上**
2. **TypeScriptとの相性改善**
3. **コードの整理がしやすい**
4. **リアクティブな値の追跡が明確**

## 基本的な使い方

### setup関数

\`\`\`vue
<template>
  <div>
    <p>カウント: {{ count }}</p>
    <button @click="increment">増やす</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++
}
</script>
\`\`\`

### コンポジション関数（Composables）

\`\`\`typescript
// useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubled = computed(() => count.value * 2)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    doubled,
    increment,
    decrement,
    reset
  }
}
\`\`\`

### 使用例

\`\`\`vue
<script setup>
import { useCounter } from './composables/useCounter'

const { count, doubled, increment, decrement, reset } = useCounter(10)
</script>
\`\`\`

## 実践的なパターン

### 1. API通信の抽象化

\`\`\`typescript
export function useApi<T>(url: string) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)
  
  const fetch = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }
  
  return { data, loading, error, fetch }
}
\`\`\`

### 2. ローカルストレージとの同期

\`\`\`typescript
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const storedValue = localStorage.getItem(key)
  const initial = storedValue ? JSON.parse(storedValue) : defaultValue
  
  const data = ref<T>(initial)
  
  watchEffect(() => {
    localStorage.setItem(key, JSON.stringify(data.value))
  })
  
  return data
}
\`\`\`

## まとめ

Composition APIを活用することで、Vue.jsアプリケーションのコードをより整理され、再利用可能で、保守しやすいものにできます。`,
        tags: ['Vue.js', 'Composition API', 'JavaScript'],
        date: '2024-01-05',
        status: 'published',
        created_at: '2024-01-05T10:00:00.000Z',
        published_at: '2024-01-05T10:00:00.000Z'
      }
    ]

    // localStorageに保存
    localStorage.setItem('articles', JSON.stringify(sampleArticles))
    console.log('サンプル記事を初期化しました')
  }

  return {
    initSampleArticles
  }
}