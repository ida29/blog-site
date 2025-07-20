// ローカルストレージを使用した記事管理（フォールバック）
export const useLocalStorageArticles = () => {
  // 記事一覧を取得
  const getArticles = async (filters = {}) => {
    try {
      const articles = JSON.parse(localStorage.getItem('articles') || '[]')
      let filtered = articles.filter(article => article.status === 'published')

      if (filters.status) {
        filtered = filtered.filter(article => article.status === filters.status)
      }

      if (filters.tag) {
        filtered = filtered.filter(article => 
          article.tags && article.tags.includes(filters.tag)
        )
      }

      if (filters.search) {
        const query = filters.search.toLowerCase()
        filtered = filtered.filter(article =>
          article.title.toLowerCase().includes(query) ||
          (article.excerpt && article.excerpt.toLowerCase().includes(query)) ||
          article.content.toLowerCase().includes(query)
        )
      }

      return filtered.sort((a, b) => new Date(b.date || b.created_at) - new Date(a.date || a.created_at))
    } catch (error) {
      console.error('Error fetching articles from localStorage:', error)
      return []
    }
  }

  // 公開記事一覧を取得
  const getPublishedArticles = async (limit = null) => {
    try {
      const articles = JSON.parse(localStorage.getItem('articles') || '[]')
      let filtered = articles.filter(article => article.status === 'published')
      filtered = filtered.sort((a, b) => new Date(b.date || b.created_at) - new Date(a.date || a.created_at))
      
      if (limit) {
        filtered = filtered.slice(0, limit)
      }
      
      return filtered
    } catch (error) {
      console.error('Error fetching published articles from localStorage:', error)
      return []
    }
  }

  // 記事を取得（ID指定）
  const getArticle = async (id) => {
    try {
      const articles = JSON.parse(localStorage.getItem('articles') || '[]')
      // IDを数値として比較（bigintとの互換性のため）
      return articles.find(article => String(article.id) === String(id)) || null
    } catch (error) {
      console.error('Error fetching article from localStorage:', error)
      return null
    }
  }

  // 記事を作成
  const createArticle = async (articleData) => {
    try {
      const articles = JSON.parse(localStorage.getItem('articles') || '[]')
      const newArticle = {
        id: Date.now(),
        ...articleData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: articleData.status === 'published' ? new Date().toISOString() : null
      }
      
      articles.unshift(newArticle)
      localStorage.setItem('articles', JSON.stringify(articles))
      
      return newArticle
    } catch (error) {
      console.error('Error creating article in localStorage:', error)
      throw error
    }
  }

  // 記事を更新
  const updateArticle = async (id, articleData) => {
    try {
      const articles = JSON.parse(localStorage.getItem('articles') || '[]')
      const index = articles.findIndex(article => String(article.id) === String(id))
      
      if (index === -1) {
        throw new Error('Article not found')
      }
      
      articles[index] = {
        ...articles[index],
        ...articleData,
        updated_at: new Date().toISOString()
      }
      
      localStorage.setItem('articles', JSON.stringify(articles))
      return articles[index]
    } catch (error) {
      console.error('Error updating article in localStorage:', error)
      throw error
    }
  }

  // 記事を削除
  const deleteArticle = async (id) => {
    try {
      const articles = JSON.parse(localStorage.getItem('articles') || '[]')
      const filtered = articles.filter(article => String(article.id) !== String(id))
      localStorage.setItem('articles', JSON.stringify(filtered))
      return true
    } catch (error) {
      console.error('Error deleting article from localStorage:', error)
      throw error
    }
  }

  // 全タグを取得
  const getAllTags = async () => {
    try {
      const articles = JSON.parse(localStorage.getItem('articles') || '[]')
      const allTags = new Set()
      
      articles
        .filter(article => article.status === 'published')
        .forEach(article => {
          if (article.tags) {
            article.tags.forEach(tag => allTags.add(tag))
          }
        })
      
      return Array.from(allTags).sort()
    } catch (error) {
      console.error('Error fetching tags from localStorage:', error)
      return []
    }
  }

  // 関連記事を取得
  const getRelatedArticles = async (currentId, tags = [], limit = 3) => {
    try {
      if (!tags.length) return []
      
      const articles = JSON.parse(localStorage.getItem('articles') || '[]')
      return articles
        .filter(article => 
          article.status === 'published' && 
          String(article.id) !== String(currentId) &&
          article.tags && 
          article.tags.some(tag => tags.includes(tag))
        )
        .sort((a, b) => new Date(b.date || b.created_at) - new Date(a.date || a.created_at))
        .slice(0, limit)
    } catch (error) {
      console.error('Error fetching related articles from localStorage:', error)
      return []
    }
  }

  return {
    getArticles,
    getPublishedArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    getAllTags,
    getRelatedArticles
  }
}