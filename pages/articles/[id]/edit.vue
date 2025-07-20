<template>
  <div class="container mx-auto px-6 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">記事を編集</h1>
    
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-gray-600 dark:text-gray-400">記事を読み込み中...</p>
    </div>
    
    <div v-else-if="!article" class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400">記事が見つかりません</p>
      <NuxtLink to="/articles" class="text-blue-600 dark:text-blue-400 hover:underline">
        記事一覧に戻る
      </NuxtLink>
    </div>
    
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              v-model="tagsString"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="タグをカンマ区切りで入力 (例: Vue.js, JavaScript, Web開発)"
            />
          </div>
          
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ステータス
            </label>
            <select
              id="status"
              v-model="article.status"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="published">公開</option>
              <option value="draft">下書き</option>
            </select>
          </div>
          
          <div class="flex space-x-4">
            <NuxtLink
              :to="`/articles/${articleId}`"
              class="flex-1 bg-gray-600 dark:bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-200 text-center"
            >
              キャンセル
            </NuxtLink>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ saving ? '保存中...' : '更新する' }}
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
          <div v-html="renderedContent" class="prose-pre:bg-gray-900 prose-pre:text-gray-100"></div>
          <div v-if="article.tags && article.tags.length > 0" class="mt-4">
            <span v-for="tag in article.tags" :key="tag" class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded mr-2 mb-2">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

definePageMeta({
  middleware: 'admin'
})

const router = useRouter()
const route = useRoute()
const { getArticle, updateArticle } = useArticles()
const { isAdmin } = useAuth()

const articleId = route.params.id
const article = ref(null)
const loading = ref(true)
const saving = ref(false)
const tagsString = ref('')

// Markdownのレンダリング
const renderedContent = computed(() => {
  if (!article.value?.content) return ''
  const rawHtml = marked(article.value.content)
  return DOMPurify.sanitize(rawHtml)
})

// 記事を取得
onMounted(async () => {
  try {
    loading.value = true
    const data = await getArticle(articleId)
    if (data) {
      article.value = { ...data }
      // タグを文字列に変換
      tagsString.value = data.tags ? data.tags.join(', ') : ''
    }
  } catch (error) {
    console.error('記事の取得に失敗しました:', error)
  } finally {
    loading.value = false
  }
})

// タグ文字列を配列に変換
watch(tagsString, (newValue) => {
  if (article.value) {
    article.value.tags = newValue
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean)
  }
})

const handleSubmit = async () => {
  try {
    saving.value = true
    
    const updateData = {
      title: article.value.title,
      excerpt: article.value.excerpt,
      content: article.value.content,
      tags: article.value.tags,
      status: article.value.status
    }
    
    await updateArticle(articleId, updateData)
    
    // 更新後に記事詳細ページにリダイレクト
    await router.push(`/articles/${articleId}`)
  } catch (error) {
    console.error('記事の更新に失敗しました:', error)
    alert('記事の更新に失敗しました。もう一度お試しください。')
  } finally {
    saving.value = false
  }
}

// 管理者でない場合はリダイレクト
if (!isAdmin.value) {
  throw createError({
    statusCode: 403,
    statusMessage: '管理者権限が必要です'
  })
}
</script>