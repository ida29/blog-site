<template>
  <div class="container mx-auto px-6 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">管理者ダッシュボード</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 記事管理カード -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">記事管理</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">すべての記事を管理・編集・削除できます</p>
        <NuxtLink to="/admin/articles" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
          記事を管理
        </NuxtLink>
      </div>
      
      <!-- ユーザー管理カード -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">ユーザー管理</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">ユーザーの権限管理や情報編集を行います</p>
        <NuxtLink to="/admin/users" class="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
          ユーザーを管理
        </NuxtLink>
      </div>
      
      <!-- サイト設定カード -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">サイト設定</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">サイトの基本設定を変更できます</p>
        <NuxtLink to="/admin/settings" class="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200">
          設定を変更
        </NuxtLink>
      </div>
    </div>
    
    <!-- 統計情報 -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">サイト統計</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">総記事数</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ articleCount }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">総ユーザー数</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">-</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">今月の投稿数</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ monthlyArticleCount }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">下書き数</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ draftCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ミドルウェアで管理者権限をチェック
definePageMeta({
  middleware: 'admin'
})

const { articles } = useArticles()

// 統計情報の計算
const articleCount = computed(() => articles.value.filter(a => a.status === 'published').length)
const draftCount = computed(() => articles.value.filter(a => a.status === 'draft').length)

const monthlyArticleCount = computed(() => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  
  return articles.value.filter(article => {
    const articleDate = new Date(article.date)
    return articleDate.getMonth() === currentMonth && 
           articleDate.getFullYear() === currentYear &&
           article.status === 'published'
  }).length
})
</script>