<template>
  <div v-if="article" class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- 記事ヘッダー -->
      <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
        <!-- 記事メタ情報 -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-8 transition-colors duration-200">
          <div class="mb-4">
            <NuxtLink to="/articles" class="text-blue-100 hover:text-white transition duration-200">
              ← 記事一覧に戻る
            </NuxtLink>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ article.title }}</h1>
          <p class="text-lg text-blue-100 mb-6">{{ article.excerpt }}</p>
          
          <div class="flex flex-wrap items-center gap-4 text-sm">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {{ formatDate(article.published_at || article.created_at || article.date) }}
            </div>
            
            <div v-if="article.tags && article.tags.length > 0" class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              <div class="flex gap-2">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="bg-white bg-opacity-20 px-2 py-1 rounded text-xs"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 記事本文 -->
        <div class="p-8">
          <div class="prose max-w-none">
            <div class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
              {{ article.content }}
            </div>
          </div>
        </div>

        <!-- 記事フッター -->
        <div class="bg-gray-50 dark:bg-gray-700 p-8 border-t dark:border-gray-600 transition-colors duration-200">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                いいね
              </button>
              
              <button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                </svg>
                シェア
              </button>
            </div>
            
            <NuxtLink to="/articles" class="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200">
              他の記事を読む
            </NuxtLink>
          </div>
        </div>
      </article>

      <!-- 関連記事 -->
      <section v-if="relatedArticles.length > 0" class="mt-12">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">関連記事</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
          >
            <div class="h-32 bg-gradient-to-br from-blue-400 to-purple-500"></div>
            <div class="p-4">
              <h3 class="font-semibold mb-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                <NuxtLink :to="`/articles/${relatedArticle.id}`">
                  {{ relatedArticle.title }}
                </NuxtLink>
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">{{ relatedArticle.excerpt.substring(0, 100) }}...</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(relatedArticle.published_at || relatedArticle.created_at || relatedArticle.date) }}</span>
                <NuxtLink :to="`/articles/${relatedArticle.id}`" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm">
                  読む →
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>

  <!-- 記事が見つからない場合 -->
  <div v-else class="container mx-auto px-6 py-8">
    <div class="max-w-2xl mx-auto text-center">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">記事が見つかりません</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">お探しの記事は存在しないか、削除された可能性があります。</p>
      <NuxtLink to="/articles" class="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200">
        記事一覧に戻る
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { getArticle, getRelatedArticles } = useArticles()
const article = ref(null)
const relatedArticles = ref([])

// SSRとクライアントサイドの両方で動作するように設定
const fetchArticleData = async () => {
  const articleId = route.params.id
  
  // 記事を取得
  try {
    const fetchedArticle = await getArticle(articleId)
    if (fetchedArticle && fetchedArticle.status === 'published') {
      article.value = fetchedArticle
      
      // 関連記事を取得
      if (fetchedArticle.tags && fetchedArticle.tags.length > 0) {
        const related = await getRelatedArticles(fetchedArticle.id, fetchedArticle.tags, 3)
        relatedArticles.value = related
      }
    }
  } catch (error) {
    console.error('記事の取得に失敗しました:', error)
  }
}

// クライアントサイドでのみ実行
onMounted(async () => {
  // サンプルデータの初期化を待つ
  await nextTick()
  await fetchArticleData()
})

// 日付フォーマット
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO設定
useHead(() => ({
  title: article.value ? `${article.value.title} - モダンブログサイト` : '記事が見つかりません - モダンブログサイト',
  meta: [
    { name: 'description', content: article.value ? article.value.excerpt : '記事が見つかりません' },
    { property: 'og:title', content: article.value ? article.value.title : '記事が見つかりません' },
    { property: 'og:description', content: article.value ? article.value.excerpt : '記事が見つかりません' },
    { property: 'og:type', content: 'article' }
  ]
}))
</script>