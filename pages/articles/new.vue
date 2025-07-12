<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">新しい記事を投稿</h1>
      
      <form @submit.prevent="submitArticle" class="space-y-6">
        <!-- タイトル -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            記事タイトル
          </label>
          <input
            id="title"
            v-model="article.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="記事のタイトルを入力してください"
          />
        </div>

        <!-- 概要 -->
        <div>
          <label for="excerpt" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            記事の概要
          </label>
          <textarea
            id="excerpt"
            v-model="article.excerpt"
            rows="3"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="記事の概要を入力してください（150文字以内）"
          ></textarea>
        </div>

        <!-- 本文 -->
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            記事本文
          </label>
          <textarea
            id="content"
            v-model="article.content"
            rows="15"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="記事の本文を入力してください"
          ></textarea>
        </div>

        <!-- タグ -->
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            タグ（カンマ区切り）
          </label>
          <input
            id="tags"
            v-model="article.tags"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="例: JavaScript, Vue.js, Web開発"
          />
        </div>

        <!-- プレビューエリア -->
        <div v-if="showPreview" class="border-t pt-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">プレビュー</h2>
          <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h3 class="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">{{ article.title || 'タイトル未入力' }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ article.excerpt || '概要未入力' }}</p>
            <div class="prose max-w-none">
              <p class="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{{ article.content || '本文未入力' }}</p>
            </div>
            <div v-if="article.tags" class="mt-4">
              <span
                v-for="tag in parsedTags"
                :key="tag"
                class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm mr-2"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- ボタン -->
        <div class="flex items-center justify-between">
          <button
            type="button"
            @click="showPreview = !showPreview"
            class="bg-gray-500 dark:bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-600 dark:hover:bg-gray-700 transition duration-200"
          >
            {{ showPreview ? 'プレビューを隠す' : 'プレビューを表示' }}
          </button>
          
          <div class="space-x-4">
            <button
              type="button"
              @click="saveDraft"
              class="bg-yellow-500 dark:bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-600 dark:hover:bg-yellow-700 transition duration-200"
            >
              下書き保存
            </button>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-200"
            >
              記事を投稿
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()

const article = ref({
  title: '',
  excerpt: '',
  content: '',
  tags: ''
})

const showPreview = ref(false)

const parsedTags = computed(() => {
  return article.value.tags
    ? article.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    : []
})

const isFormValid = computed(() => {
  return article.value.title.trim() && 
         article.value.excerpt.trim() && 
         article.value.content.trim()
})

const submitArticle = async () => {
  if (!isFormValid.value) return

  try {
    // ここで実際のAPIへの投稿処理を行う
    // 現在はローカルストレージに保存
    const articles = JSON.parse(localStorage.getItem('articles') || '[]')
    const newArticle = {
      id: Date.now(),
      ...article.value,
      tags: parsedTags.value,
      date: new Date().toISOString().split('T')[0],
      status: 'published'
    }
    
    articles.unshift(newArticle)
    localStorage.setItem('articles', JSON.stringify(articles))

    // 成功メッセージ
    alert('記事が正常に投稿されました！')
    
    // 記事一覧ページにリダイレクト
    await router.push('/articles')
  } catch (error) {
    console.error('記事の投稿に失敗しました:', error)
    alert('記事の投稿に失敗しました。もう一度お試しください。')
  }
}

const saveDraft = () => {
  try {
    const drafts = JSON.parse(localStorage.getItem('drafts') || '[]')
    const draft = {
      id: Date.now(),
      ...article.value,
      tags: parsedTags.value,
      date: new Date().toISOString().split('T')[0],
      status: 'draft'
    }
    
    drafts.unshift(draft)
    localStorage.setItem('drafts', JSON.stringify(drafts))
    
    alert('下書きが保存されました！')
  } catch (error) {
    console.error('下書きの保存に失敗しました:', error)
    alert('下書きの保存に失敗しました。')
  }
}

useHead({
  title: '新しい記事を投稿 - モダンブログサイト',
  meta: [
    { name: 'description', content: '新しいブログ記事を投稿してください。' }
  ]
})
</script>