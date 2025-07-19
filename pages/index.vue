<template>
  <div>
    <!-- Hero Section with 3D Effects -->
    <section class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white py-20 transition-colors duration-200">
      <!-- Animated Background -->
      <div class="absolute inset-0 holographic opacity-30"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/10 to-purple-500/10 animate-pulse"></div>
      
      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl" style="animation: float 6s ease-in-out infinite;"></div>
      <div class="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full blur-xl" style="animation: float 4s ease-in-out infinite reverse;"></div>
      <div class="absolute bottom-20 left-1/4 w-12 h-12 bg-cyan-400/20 rounded-full blur-xl" style="animation: float 5s ease-in-out infinite;"></div>
      
      <div class="container mx-auto px-6 text-center relative z-10">
        <h1 class="text-6xl font-bold mb-6 neon-text" style="animation: fade-in-up 1s ease-out;">
          Welcome to yida's tech blog
        </h1>
        <p class="text-xl mb-8 max-w-2xl mx-auto glass-effect rounded-lg p-6" style="animation: fade-in-up 1s ease-out 0.3s both;">
          エンジニアyidaが技術に関する学びや体験を共有するブログです。
          Web開発、プログラミング、新技術の探求について発信しています。
        </p>
        <div class="space-x-4" style="animation: fade-in-up 1s ease-out 0.6s both;">
          <NuxtLink to="/articles" class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:scale-110 hover:shadow-2xl transition duration-300 transform hover:rotate-1" style="animation: pulse-glow 3s ease-in-out infinite;">
            記事を読む
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">このブログについて</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            技術の学習記録、開発での気づき、新しい技術の検証結果などを発信しています
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center card-3d glass-effect rounded-xl p-6 hover:scale-105 transition duration-500" style="animation: slide-in-left 1s ease-out;">
            <div class="bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style="animation: glow 3s ease-in-out infinite;">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">学習記録</h3>
            <p class="text-gray-600 dark:text-gray-400">新しい技術やツールを学んだ過程と結果を記録し、共有しています</p>
          </div>
          <div class="text-center card-3d glass-effect rounded-xl p-6 hover:scale-105 transition duration-500" style="animation: fade-in-up 1s ease-out 0.3s both;">
            <div class="bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style="animation: glow 3s ease-in-out infinite 1s;">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">実践的な内容</h3>
            <p class="text-gray-600 dark:text-gray-400">実際の開発で得た知見やハマった問題の解決方法を実践的に紹介</p>
          </div>
          <div class="text-center card-3d glass-effect rounded-xl p-6 hover:scale-105 transition duration-500" style="animation: slide-in-right 1s ease-out 0.6s both;">
            <div class="bg-gradient-to-br from-purple-400 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style="animation: glow 3s ease-in-out infinite 2s;">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">技術探求</h3>
            <p class="text-gray-600 dark:text-gray-400">フロントエンド・バックエンド・インフラなど幅広い技術領域を探求</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Articles Section -->
    <section class="bg-gray-100 dark:bg-gray-800 py-16 transition-colors duration-200">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">最新の投稿</h2>
          <p class="text-gray-600 dark:text-gray-400">最近の技術記事や学習記録をチェックしてみてください</p>
        </div>
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p class="text-gray-600 dark:text-gray-400">記事を読み込み中...</p>
        </div>
        <div v-else-if="recentArticles.length === 0" class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-400">まだ記事がありません。最初の記事を投稿してみましょう！</p>
        </div>
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="article in recentArticles" :key="article.id" class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
            <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{{ article.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(article.published_at || article.created_at || article.date) }}</span>
                <NuxtLink :to="`/articles/${article.id}`" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                  続きを読む →
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
        <div class="text-center mt-12">
          <NuxtLink to="/articles" class="bg-blue-600 dark:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200">
            すべての記事を見る
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { getPublishedArticles } = useArticles()
const recentArticles = ref([])
const loading = ref(true)

// 日付フォーマット
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 最新の記事を取得
onMounted(async () => {
  try {
    loading.value = true
    // 最新3件を取得
    const articles = await getPublishedArticles(3)
    recentArticles.value = articles
  } catch (error) {
    console.error('記事の取得に失敗しました:', error)
  } finally {
    loading.value = false
  }
})

useHead({
  title: 'ホーム - yidaのtechブログ',
  meta: [
    { name: 'description', content: 'エンジニアyidaの技術ブログ。Web開発、プログラミング、新技術について学習記録と実践的な知見を発信しています。' }
  ]
})
</script>