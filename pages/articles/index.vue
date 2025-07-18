<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-6xl mx-auto">
      <!-- ヘッダー -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">記事一覧</h1>
        <NuxtLink to="/articles/new" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
          新しい記事を投稿
        </NuxtLink>
      </div>

      <!-- 検索・フィルター -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 transition-colors duration-200">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="記事を検索..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="flex gap-2">
            <select
              v-model="selectedTag"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">すべてのタグ</option>
              <option v-for="tag in allTags" :key="tag" :value="tag">
                {{ tag }}
              </option>
            </select>
            <select
              v-model="sortBy"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date">日付順</option>
              <option value="title">タイトル順</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ローディング状態 -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-600 dark:text-gray-400">記事を読み込み中...</p>
      </div>

      <!-- エラー状態 -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">エラーが発生しました</h3>
        <p class="text-gray-500 dark:text-gray-500 mb-6">{{ error }}</p>
        <button @click="$router.go(0)" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
          再読み込み
        </button>
      </div>

      <!-- 記事がない場合 -->
      <div v-else-if="filteredArticles.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          {{ searchQuery || selectedTag ? '該当する記事が見つかりません' : '記事がまだありません' }}
        </h3>
        <p class="text-gray-500 dark:text-gray-500 mb-6">
          {{ searchQuery || selectedTag ? '検索条件を変更してみてください。' : '最初の記事を投稿してみましょう！' }}
        </p>
        <div class="space-x-4">
          <NuxtLink to="/articles/new" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 inline-block">
            記事を投稿する
          </NuxtLink>
          <NuxtLink v-if="!searchQuery && !selectedTag && articles.length === 0" to="/init" class="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-200 inline-block">
            サンプルデータを追加
          </NuxtLink>
        </div>
      </div>

      <!-- 記事一覧 -->
      <div v-else class="grid gap-6">
        <article
          v-for="article in filteredArticles"
          :key="article.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                  <NuxtLink :to="`/articles/${article.id}`">
                    {{ article.title }}
                  </NuxtLink>
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-4">{{ article.excerpt }}</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(article.published_at || article.created_at) }}</span>
                <div v-if="article.tags && article.tags.length > 0" class="flex gap-2">
                  <span
                    v-for="tag in article.tags.slice(0, 3)"
                    :key="tag"
                    class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800"
                    @click="selectedTag = tag"
                  >
                    {{ tag }}
                  </span>
                  <span v-if="article.tags.length > 3" class="text-xs text-gray-500 dark:text-gray-400">
                    +{{ article.tags.length - 3 }}
                  </span>
                </div>
              </div>
              
              <NuxtLink
                :to="`/articles/${article.id}`"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
              >
                続きを読む →
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <!-- ページネーション（将来の拡張用） -->
      <div v-if="filteredArticles.length > 0" class="mt-12 text-center">
        <p class="text-gray-600 dark:text-gray-400">{{ filteredArticles.length }}件の記事を表示中</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getPublishedArticles, getAllTags } = useArticles()

const searchQuery = ref('')
const selectedTag = ref('')
const sortBy = ref('date')
const articles = ref([])
const allTags = ref([])
const loading = ref(true)
const error = ref(null)

// データを取得
onMounted(async () => {
  try {
    loading.value = true
    const [articlesData, tagsData] = await Promise.all([
      getPublishedArticles(),
      getAllTags()
    ])
    articles.value = articlesData
    allTags.value = tagsData
  } catch (err) {
    console.error('記事の取得に失敗しました:', err)
    error.value = '記事の読み込みに失敗しました。'
  } finally {
    loading.value = false
  }
})

// フィルタリングされた記事
const filteredArticles = computed(() => {
  let filtered = [...articles.value]

  // 検索クエリでフィルタリング
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(query)) ||
      article.content.toLowerCase().includes(query)
    )
  }

  // タグでフィルタリング
  if (selectedTag.value) {
    filtered = filtered.filter(article =>
      article.tags && article.tags.includes(selectedTag.value)
    )
  }

  // ソート
  filtered.sort((a, b) => {
    if (sortBy.value === 'date') {
      return new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at)
    } else if (sortBy.value === 'title') {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  return filtered
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

useHead({
  title: '記事一覧 - yidaのtechブログ',
  meta: [
    { name: 'description', content: 'yidaが投稿した技術記事の一覧をご覧いただけます。Web開発、プログラミング、新技術について発信しています。' }
  ]
})
</script>