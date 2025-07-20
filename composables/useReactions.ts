export const useReactions = () => {
  const { $supabase } = useNuxtApp()

  // 利用可能な絵文字の定義
  const reactionTypes = [
    { emoji: '❤️', name: 'love', label: '素晴らしい' },
    { emoji: '👍', name: 'like', label: 'いいね' },
    { emoji: '😄', name: 'laugh', label: '面白い' },
    { emoji: '🤔', name: 'think', label: '考えさせられる' },
    { emoji: '🔥', name: 'fire', label: '熱い' }
  ]

  // セッションIDを取得または生成
  const getSessionId = () => {
    if (!process.client) return null
    
    let sessionId = localStorage.getItem('session_id')
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      localStorage.setItem('session_id', sessionId)
    }
    return sessionId
  }

  // Supabaseが利用できない場合のローカルストレージ実装
  const localStorageReactions = {
    getReactions: (articleId: string | number) => {
      if (process.client) {
        const reactions = localStorage.getItem(`reactions_${articleId}`)
        return reactions ? JSON.parse(reactions) : {}
      }
      return {}
    },
    
    saveReactions: (articleId: string | number, reactions: Record<string, number>) => {
      if (process.client) {
        localStorage.setItem(`reactions_${articleId}`, JSON.stringify(reactions))
      }
    },
    
    getUserReactions: (articleId: string | number) => {
      if (process.client) {
        const userReactions = localStorage.getItem(`user_reactions_${articleId}`)
        return userReactions ? JSON.parse(userReactions) : []
      }
      return []
    },
    
    saveUserReactions: (articleId: string | number, userReactions: string[]) => {
      if (process.client) {
        localStorage.setItem(`user_reactions_${articleId}`, JSON.stringify(userReactions))
      }
    }
  }

  // リアクションデータを取得
  const getReactions = async (articleId: string | number) => {
    if (!$supabase || !$supabase.from) {
      return localStorageReactions.getReactions(articleId)
    }

    try {
      const { data, error } = await $supabase
        .from('article_reactions')
        .select('reaction_type')
        .eq('article_id', articleId)

      if (error) throw error

      // カウントを集計
      const reactions: Record<string, number> = {}
      if (data) {
        data.forEach((item: any) => {
          reactions[item.reaction_type] = (reactions[item.reaction_type] || 0) + 1
        })
      }
      
      return reactions
    } catch (error) {
      console.error('リアクション取得エラー:', error)
      return localStorageReactions.getReactions(articleId)
    }
  }

  // ユーザーのリアクション履歴を取得
  const getUserReactions = async (articleId: string | number) => {
    if (!$supabase || !$supabase.from) {
      return localStorageReactions.getUserReactions(articleId)
    }

    try {
      const { data: { user } } = await $supabase.auth.getUser()
      const sessionId = getSessionId()

      const query = $supabase
        .from('article_reactions')
        .select('reaction_type')
        .eq('article_id', articleId)

      if (user) {
        query.eq('user_id', user.id)
      } else {
        query.eq('session_id', sessionId)
      }

      const { data, error } = await query

      if (error) throw error

      return data ? data.map((item: any) => item.reaction_type) : []
    } catch (error) {
      console.error('ユーザーリアクション取得エラー:', error)
      return localStorageReactions.getUserReactions(articleId)
    }
  }

  // リアクションを追加
  const addReaction = async (articleId: string | number, reactionName: string) => {
    if (!$supabase || !$supabase.from) {
      // LocalStorageフォールバック
      const reactions = localStorageReactions.getReactions(articleId)
      const userReactions = localStorageReactions.getUserReactions(articleId)
      
      if (userReactions.includes(reactionName)) {
        return false
      }
      
      reactions[reactionName] = (reactions[reactionName] || 0) + 1
      userReactions.push(reactionName)
      
      localStorageReactions.saveReactions(articleId, reactions)
      localStorageReactions.saveUserReactions(articleId, userReactions)
      
      return true
    }

    try {
      const { data: { user } } = await $supabase.auth.getUser()
      const sessionId = getSessionId()

      const insertData: any = {
        article_id: articleId,
        reaction_type: reactionName
      }

      if (user) {
        insertData.user_id = user.id
      } else {
        insertData.session_id = sessionId
      }

      const { error } = await $supabase
        .from('article_reactions')
        .insert(insertData)

      if (error) {
        if (error.code === '23505') { // 重複エラー
          return false
        }
        throw error
      }

      return true
    } catch (error) {
      console.error('リアクション追加エラー:', error)
      return false
    }
  }

  // リアクションを削除
  const removeReaction = async (articleId: string | number, reactionName: string) => {
    if (!$supabase || !$supabase.from) {
      // LocalStorageフォールバック
      const reactions = localStorageReactions.getReactions(articleId)
      const userReactions = localStorageReactions.getUserReactions(articleId)
      
      const reactionIndex = userReactions.indexOf(reactionName)
      if (reactionIndex === -1) {
        return false
      }
      
      if (reactions[reactionName] && reactions[reactionName] > 0) {
        reactions[reactionName] -= 1
        if (reactions[reactionName] === 0) {
          delete reactions[reactionName]
        }
      }
      
      userReactions.splice(reactionIndex, 1)
      
      localStorageReactions.saveReactions(articleId, reactions)
      localStorageReactions.saveUserReactions(articleId, userReactions)
      
      return true
    }

    try {
      const { data: { user } } = await $supabase.auth.getUser()
      const sessionId = getSessionId()

      const query = $supabase
        .from('article_reactions')
        .delete()
        .eq('article_id', articleId)
        .eq('reaction_type', reactionName)

      if (user) {
        query.eq('user_id', user.id)
      } else {
        query.eq('session_id', sessionId)
      }

      const { error } = await query

      if (error) throw error

      return true
    } catch (error) {
      console.error('リアクション削除エラー:', error)
      return false
    }
  }

  // リアクションをトグル
  const toggleReaction = async (articleId: string | number, reactionName: string) => {
    const userReactions = await getUserReactions(articleId)
    
    if (userReactions.includes(reactionName)) {
      return removeReaction(articleId, reactionName)
    } else {
      return addReaction(articleId, reactionName)
    }
  }

  // 総リアクション数を取得
  const getTotalReactions = async (articleId: string | number) => {
    const reactions = await getReactions(articleId)
    return Object.values(reactions).reduce((sum: number, count: number) => sum + count, 0)
  }

  // ユーザーがリアクションしているかチェック
  const hasUserReacted = async (articleId: string | number, reactionName: string) => {
    const userReactions = await getUserReactions(articleId)
    return userReactions.includes(reactionName)
  }

  return {
    reactionTypes,
    getReactions,
    addReaction,
    removeReaction,
    toggleReaction,
    getTotalReactions,
    hasUserReacted,
    getUserReactions
  }
}