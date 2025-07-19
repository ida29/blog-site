<template>
  <div class="container mx-auto px-6 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">新しい記事を投稿</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 入力フォーム -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">記事情報</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              タイトル
            </label>
            <input
              id="title"
              v-model="article.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="記事のタイトルを入力"
            />
          </div>
          
          <div>
            <label for="excerpt" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              概要
            </label>
            <textarea
              id="excerpt"
              v-model="article.excerpt"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="記事の概要を入力"
            ></textarea>
          </div>
          
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              本文
            </label>
            <textarea
              id="content"
              v-model="article.content"
              rows="12"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="記事の本文をMarkdown形式で入力"
            ></textarea>
          </div>
          
          <div>
            <label for="tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              タグ
            </label>
            <input
              id="tags"
              v-model="article.tags"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="タグをカンマ区切りで入力 (例: Vue.js, JavaScript, Web開発)"
            />
          </div>
          
          <div class="flex space-x-4">
            <button
              type="button"
              @click="saveDraft"
              class="flex-1 bg-gray-600 dark:bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-200"
            >
              下書き保存
            </button>
            <button
              type="submit"
              class="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200"
            >
              投稿する
            </button>
          </div>
        </form>
      </div>
      
      <!-- プレビュー -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">プレビュー</h2>
        <div class="prose dark:prose-invert max-w-none">
          <h1 class="text-2xl font-bold mb-4">{{ article.title || 'タイトル' }}</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-4">{{ article.excerpt || '概要' }}</p>
          <div class="whitespace-pre-wrap">{{ article.content || '本文' }}</div>
          <div v-if="article.tags" class="mt-4">
            <span v-for="tag in article.tags.split(',').map(t => t.trim()).filter(Boolean)" :key="tag" class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded mr-2 mb-2">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

const router = useRouter()

const article = ref({
  title: '',
  excerpt: '',
  content: '',
  tags: ''
})

const handleSubmit = async () => {
  const now = new Date()
  const articleData = {
    id: Date.now(),
    title: article.value.title,
    excerpt: article.value.excerpt,
    content: article.value.content,
    tags: article.value.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    date: now.toISOString().split('T')[0],
    status: 'published'
  }
  
  // ここで実際の投稿処理を行う
  console.log('記事を投稿:', articleData)
  
  // 投稿後にリダイレクト
  await router.push('/articles')
}

const saveDraft = () => {
  const draftData = {
    id: Date.now(),
    title: article.value.title,
    excerpt: article.value.excerpt,
    content: article.value.content,
    tags: article.value.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    date: new Date().toISOString().split('T')[0],
    status: 'draft'
  }
  
  // 下書き保存処理
  console.log('下書きを保存:', draftData)
  alert('下書きを保存しました')
}
</script>