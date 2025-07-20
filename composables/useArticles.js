export const useArticles = () => {
  const { $supabase } = useNuxtApp()
  
  // Supabaseが利用できない場合のフォールバック
  try {
    if (!$supabase || !$supabase.from) {
      console.warn('Supabaseが利用できません。ローカルストレージを使用します。')
      return useLocalStorageArticles()
    }
  } catch (error) {
    console.warn('Supabaseへの接続に失敗しました。ローカルストレージを使用します。')
    return useLocalStorageArticles()
  }

  // 記事一覧を取得
  const getArticles = async (filters = {}) => {
    try {
      let query = $supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

      // フィルタリング
      if (filters.status) {
        query = query.eq('status', filters.status)
      }

      if (filters.tag) {
        query = query.contains('tags', [filters.tag])
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching articles:', error)
      throw error
    }
  }

  // 公開記事一覧を取得
  const getPublishedArticles = async (limit = null) => {
    try {
      let query = $supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching published articles:', error)
      throw error
    }
  }

  // 記事を取得（ID指定）
  const getArticle = async (id) => {
    try {
      const { data, error } = await $supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching article:', error)
      throw error
    }
  }

  // 記事を作成
  const createArticle = async (articleData) => {
    try {
      const { data, error } = await $supabase
        .from('articles')
        .insert([articleData])
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error creating article:', error)
      // Supabaseエラーの場合、LocalStorageにフォールバック
      console.warn('Supabaseでの作成に失敗しました。LocalStorageを使用します。')
      const localStorageArticles = useLocalStorageArticles()
      return await localStorageArticles.createArticle(articleData)
    }
  }

  // 記事を更新
  const updateArticle = async (id, articleData) => {
    try {
      const { data, error } = await $supabase
        .from('articles')
        .update(articleData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error updating article:', error)
      throw error
    }
  }

  // 記事を削除
  const deleteArticle = async (id) => {
    try {
      const { error } = await $supabase
        .from('articles')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting article:', error)
      throw error
    }
  }

  // 全タグを取得
  const getAllTags = async () => {
    try {
      const { data, error } = await $supabase
        .from('articles')
        .select('tags')
        .eq('status', 'published')

      if (error) {
        throw error
      }

      // 全記事のタグを統合して重複を除去
      const allTags = new Set()
      data.forEach(article => {
        if (article.tags) {
          article.tags.forEach(tag => allTags.add(tag))
        }
      })

      return Array.from(allTags).sort()
    } catch (error) {
      console.error('Error fetching tags:', error)
      throw error
    }
  }

  // 関連記事を取得
  const getRelatedArticles = async (currentId, tags = [], limit = 3) => {
    try {
      if (!tags.length) return []

      const { data, error } = await $supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .neq('id', currentId)
        .overlaps('tags', tags)
        .order('published_at', { ascending: false })
        .limit(limit)

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching related articles:', error)
      throw error
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