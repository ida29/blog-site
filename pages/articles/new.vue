<template>
  <div class="container mx-auto px-6 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">新しい記事を投稿</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 入力フォーム -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">記事情報</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-4 gap-4">
            <div class="col-span-3">
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
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                アイキャッチ
              </label>
              <button
                type="button"
                @click="showEmojiPicker = !showEmojiPicker"
                class="w-full h-[42px] text-2xl border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700 transition duration-200 relative"
              >
                {{ article.emoji }}
              </button>
              <!-- 絵文字ピッカー -->
              <div v-if="showEmojiPicker" class="absolute z-10 mt-2 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                <div class="grid grid-cols-8 gap-2 max-w-sm">
                  <button
                    v-for="emoji in popularEmojis"
                    :key="emoji"
                    type="button"
                    @click="selectEmoji(emoji)"
                    class="text-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition duration-200"
                  >
                    {{ emoji }}
                  </button>
                </div>
              </div>
            </div>
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
          <h1 class="text-2xl font-bold mb-4 flex items-center gap-3">
            <span class="text-4xl">{{ article.emoji }}</span>
            {{ article.title || 'タイトル' }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mb-4">{{ article.excerpt || '概要' }}</p>
          <div v-html="renderedContent" class="prose-pre:bg-gray-900 prose-pre:text-gray-100"></div>
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
import { marked } from 'marked'

// definePageMeta({
//   middleware: 'admin'
// })

const router = useRouter()
const { createArticle } = useArticles()

const article = ref({
  title: '',
  excerpt: '',
  content: '',
  tags: '',
  emoji: '📝'
})

const showEmojiPicker = ref(false)

// 人気の絵文字リスト
const popularEmojis = [
  '📝', '💡', '🚀', '🔥', '💻', '📱', '🎨', '📊',
  '🛠️', '⚡', '🌟', '💎', '🔧', '🎯', '📚', '🌐',
  '🔒', '🔑', '📈', '💰', '🎉', '✨', '🏆', '🎁',
  '🤖', '🧠', '💪', '👀', '🔍', '📍', '🎮', '🎧',
  '☕', '🍕', '🌈', '🌙', '⭐', '🍀', '🌸', '🦄'
]

// 絵文字を選択
const selectEmoji = (emoji) => {
  article.value.emoji = emoji
  showEmojiPicker.value = false
}

// Markdownのレンダリング
const renderedContent = computed(() => {
  if (!article.value?.content) return ''
  const rawHtml = marked(article.value.content)
  // SSR対応のため、クライアントサイドでのみサニタイズ
  if (process.client) {
    const DOMPurify = window.DOMPurify || {}
    if (DOMPurify.sanitize) {
      return DOMPurify.sanitize(rawHtml)
    }
  }
  return rawHtml
})

const handleSubmit = async () => {
  try {
    const articleData = {
      title: article.value.title,
      excerpt: article.value.excerpt,
      content: article.value.content,
      tags: article.value.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      status: 'published',
      emoji: article.value.emoji
    }
    
    // 実際の投稿処理
    await createArticle(articleData)
    
    // 投稿後にリダイレクト
    await router.push('/articles')
  } catch (error) {
    console.error('記事の投稿に失敗しました:', error)
    alert('記事の投稿に失敗しました。もう一度お試しください。')
  }
}

const saveDraft = async () => {
  try {
    const draftData = {
      title: article.value.title,
      excerpt: article.value.excerpt,
      content: article.value.content,
      tags: article.value.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      status: 'draft',
      emoji: article.value.emoji
    }
    
    // 下書き保存処理
    await createArticle(draftData)
    alert('下書きを保存しました')
  } catch (error) {
    console.error('下書きの保存に失敗しました:', error)
    alert('下書きの保存に失敗しました。もう一度お試しください。')
  }
}
</script>