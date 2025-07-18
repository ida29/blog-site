<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">デバッグ情報</h1>
      
      <!-- ルーティング情報 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">ルーティング情報</h2>
        <div class="space-y-2 font-mono text-sm">
          <p>Base URL: {{ runtimeConfig.app.baseURL }}</p>
          <p>Current Route: {{ route.fullPath }}</p>
          <p>Route Params: {{ JSON.stringify(route.params) }}</p>
        </div>
      </div>

      <!-- LocalStorage記事一覧 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">LocalStorage記事一覧</h2>
        <div v-if="localStorageArticles.length > 0" class="space-y-4">
          <div v-for="article in localStorageArticles" :key="article.id" class="border-b pb-4">
            <h3 class="font-semibold">{{ article.title }}</h3>
            <p class="text-sm text-gray-600">ID: {{ article.id }} (型: {{ typeof article.id }})</p>
            <p class="text-sm text-gray-600">Status: {{ article.status }}</p>
            <p class="text-sm text-gray-600">Date: {{ article.date || article.published_at || article.created_at }}</p>
            <div class="mt-2 space-x-4">
              <NuxtLink 
                :to="`/articles/${article.id}`" 
                class="text-blue-600 hover:underline text-sm"
              >
                通常リンク
              </NuxtLink>
              <a 
                :href="`${runtimeConfig.app.baseURL}articles/${article.id}`" 
                class="text-green-600 hover:underline text-sm"
              >
                絶対パスリンク
              </a>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-600">
          記事が見つかりません。<NuxtLink to="/init" class="text-blue-600 hover:underline">初期化ページ</NuxtLink>でサンプルデータを追加してください。
        </div>
      </div>

      <!-- Composable動作テスト -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Composable動作テスト</h2>
        <div class="space-y-4">
          <div>
            <h3 class="font-semibold mb-2">getArticle(1)の結果:</h3>
            <pre class="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs overflow-x-auto">{{ testArticle1 }}</pre>
          </div>
          <div>
            <h3 class="font-semibold mb-2">getArticle("1")の結果:</h3>
            <pre class="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs overflow-x-auto">{{ testArticle1String }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const { getArticle } = useArticles()

// LocalStorageから直接記事を取得
const localStorageArticles = ref([])

// テスト用のarticle取得
const testArticle1 = ref(null)
const testArticle1String = ref(null)

onMounted(async () => {
  // LocalStorageから記事を取得
  try {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]')
    localStorageArticles.value = articles
  } catch (error) {
    console.error('LocalStorage読み込みエラー:', error)
  }

  // Composableのテスト
  try {
    testArticle1.value = await getArticle(1)
  } catch (error) {
    testArticle1.value = { error: error.message }
  }

  try {
    testArticle1String.value = await getArticle("1")
  } catch (error) {
    testArticle1String.value = { error: error.message }
  }
})

useHead({
  title: 'デバッグ情報 - yidaのtechブログ',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>