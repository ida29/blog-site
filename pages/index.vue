<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white py-20 transition-colors duration-200">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-5xl font-bold mb-6">
          モダンブログサイトへようこそ
        </h1>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Nuxt.jsとTailwindCSSで作成された、美しく機能的なブログプラットフォーム。
          あなたの考えや体験を世界に発信しましょう。
        </p>
        <div class="space-x-4">
          <NuxtLink to="/articles/new" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200">
            記事を投稿する
          </NuxtLink>
          <NuxtLink to="/articles" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-200">
            記事を読む
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">サイトの特徴</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            モダンな技術スタックと直感的なUIで、快適な執筆・読書体験を提供します
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">簡単な記事投稿</h3>
            <p class="text-gray-600 dark:text-gray-400">直感的なエディターで、誰でも簡単に美しい記事を作成できます</p>
          </div>
          <div class="text-center">
            <div class="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">高速パフォーマンス</h3>
            <p class="text-gray-600 dark:text-gray-400">Nuxt.jsの最適化により、快適な閲覧体験を実現しています</p>
          </div>
          <div class="text-center">
            <div class="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">レスポンシブデザイン</h3>
            <p class="text-gray-600 dark:text-gray-400">あらゆるデバイスで美しく表示される、モバイルファーストなデザイン</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Articles Section -->
    <section class="bg-gray-100 dark:bg-gray-800 py-16 transition-colors duration-200">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">最新の記事</h2>
          <p class="text-gray-600 dark:text-gray-400">最近投稿された記事をチェックしてみてください</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="article in recentArticles" :key="article.id" class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
            <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{{ article.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ article.date }}</span>
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
// Sample data - 実際のアプリではAPIから取得
const recentArticles = ref([
  {
    id: 1,
    title: "Nuxt.js 3の新機能について",
    excerpt: "Nuxt.js 3で追加された新機能とその活用方法について詳しく解説します。",
    date: "2025-01-15"
  },
  {
    id: 2,
    title: "TailwindCSSでモダンなデザインを作成",
    excerpt: "TailwindCSSを使って効率的にモダンなWebデザインを作成する方法をご紹介。",
    date: "2025-01-10"
  },
  {
    id: 3,
    title: "JAMstackアーキテクチャの利点",
    excerpt: "JAMstackアーキテクチャがなぜ注目されているのか、その利点を詳しく説明します。",
    date: "2025-01-05"
  }
])

useHead({
  title: 'ホーム - モダンブログサイト',
  meta: [
    { name: 'description', content: 'Nuxt.jsとTailwindCSSで作成されたモダンなブログサイト。記事の投稿・閲覧ができます。' }
  ]
})
</script>