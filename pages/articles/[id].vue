<template>
  <div v-if="article" class="container mx-auto px-6 py-8 relative">
    <!-- Space Background Elements -->
    <div class="absolute top-20 right-5 planet planet-green opacity-20" style="animation: float 10s ease-in-out infinite;"></div>
    <div class="absolute bottom-40 left-5 planet planet-orange opacity-25" style="animation: float 7s ease-in-out infinite reverse;"></div>
    <div class="absolute top-60 left-20 satellite opacity-30" style="animation-delay: -2s;"></div>
    
    <!-- Mini Orbital System -->
    <div class="absolute top-10 left-10 opacity-20" style="width: 150px; height: 150px;">
      <div class="orbit-path" style="width: 100px; height: 100px; top: 25px; left: 25px;"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-200 rounded-full"></div>
      <div style="animation: orbit-fast 8s linear infinite;">
        <div class="w-2 h-2 bg-blue-400 rounded-full absolute" style="top: 23px; left: 48px;"></div>
      </div>
    </div>
    
    <!-- Scattered Stars -->
    <div class="star opacity-50" style="top: 25%; left: 85%; width: 1px; height: 1px;"></div>
    <div class="star opacity-30" style="top: 60%; left: 15%; width: 1.5px; height: 1.5px; animation-delay: 1.5s;"></div>
    <div class="star opacity-60" style="top: 80%; left: 90%; width: 1px; height: 1px; animation-delay: 0.8s;"></div>
    
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- メインコンテンツ -->
        <div class="lg:col-span-3">
      <!-- 記事ヘッダー -->
      <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
        <!-- 記事メタ情報 -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-8 transition-colors duration-200">
          <div class="flex justify-between items-center mb-4">
            <NuxtLink to="/articles" class="text-blue-100 hover:text-white transition duration-200">
              ← 記事一覧に戻る
            </NuxtLink>
            <button
              v-if="isAdmin"
              @click="showDeleteConfirm = true"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition duration-200"
            >
              削除
            </button>
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
          <div class="prose prose-lg max-w-none dark:prose-invert
                      prose-headings:font-bold prose-headings:text-gray-800 dark:prose-headings:text-gray-100
                      prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
                      prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3
                      prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-2
                      prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                      prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline prose-a:font-medium
                      prose-strong:text-gray-800 dark:prose-strong:text-gray-200 prose-strong:font-bold
                      prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                      prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                      prose-blockquote:border-l-4 prose-blockquote:border-blue-600 dark:prose-blockquote:border-blue-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                      prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                      prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                      prose-li:mb-2
                      prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto
                      prose-hr:border-gray-300 dark:prose-hr:border-gray-600 prose-hr:my-8"
                 v-html="renderedContent">
          </div>
        </div>

      </article>

          <!-- リアクション機能 -->
          <div class="mt-8">
            <ArticleReactions :article-id="article.id" />
          </div>

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

        <!-- サイドバー -->
        <div class="lg:col-span-1">
          <div class="space-y-6">
            <!-- 目次 -->
            <TableOfContents :content="article.content" />
          </div>
        </div>
      </div>
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

  <!-- 削除確認ダイアログ -->
  <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">記事を削除しますか？</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">この操作は取り消すことができません。</p>
      <div class="flex gap-3 justify-end">
        <button
          @click="showDeleteConfirm = false"
          class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition duration-200"
        >
          キャンセル
        </button>
        <button
          @click="handleDelete"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
        >
          削除する
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const { getArticle, getRelatedArticles, deleteArticle } = useArticles()
const { user, isAdmin } = useAuth()
const article = ref(null)
const relatedArticles = ref([])
const renderedContent = ref('')
const showDeleteConfirm = ref(false)

onMounted(async () => {
  const articleId = route.params.id
  
  // 記事を取得
  try {
    const fetchedArticle = await getArticle(articleId)
    if (fetchedArticle && fetchedArticle.status === 'published') {
      article.value = fetchedArticle
      
      // マークダウンをHTMLに変換
      if (fetchedArticle.content) {
        // marked設定でheading IDを自動生成
        marked.setOptions({
          headerIds: true,
          mangle: false
        })
        
        const rawHtml = marked(fetchedArticle.content)
        // SSR対応のため、クライアントサイドでのみサニタイズ
        if (process.client) {
          const DOMPurify = (await import('dompurify')).default
          renderedContent.value = DOMPurify.sanitize(rawHtml)
        } else {
          renderedContent.value = rawHtml
        }
      }
      
      // 関連記事を取得
      if (fetchedArticle.tags && fetchedArticle.tags.length > 0) {
        const related = await getRelatedArticles(fetchedArticle.id, fetchedArticle.tags, 3)
        relatedArticles.value = related
      }
    }
  } catch (error) {
    console.error('記事の取得に失敗しました:', error)
  }
})

// 記事削除処理
const handleDelete = async () => {
  try {
    await deleteArticle(article.value.id)
    showDeleteConfirm.value = false
    await router.push('/articles')
  } catch (error) {
    console.error('記事の削除に失敗しました:', error)
    alert('記事の削除に失敗しました')
  }
}

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