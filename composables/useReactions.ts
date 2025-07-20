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

  // リアクションデータを取得
  const getReactions = (articleId: string | number) => {
    // localStorage only (Supabase integration can be added later)
    if (process.client) {
      const reactions = localStorage.getItem(`reactions_${articleId}`)
      return reactions ? JSON.parse(reactions) : {}
    }
    return {}
  }

  // リアクションを保存
  const saveReactions = (articleId: string | number, reactions: Record<string, number>) => {
    if (process.client) {
      localStorage.setItem(`reactions_${articleId}`, JSON.stringify(reactions))
    }
  }

  // ユーザーのリアクション履歴を取得
  const getUserReactions = (articleId: string | number) => {
    if (process.client) {
      const userReactions = localStorage.getItem(`user_reactions_${articleId}`)
      return userReactions ? JSON.parse(userReactions) : []
    }
    return []
  }

  // ユーザーのリアクション履歴を保存
  const saveUserReactions = (articleId: string | number, userReactions: string[]) => {
    if (process.client) {
      localStorage.setItem(`user_reactions_${articleId}`, JSON.stringify(userReactions))
    }
  }

  // リアクションを追加
  const addReaction = (articleId: string | number, reactionName: string) => {
    const reactions = getReactions(articleId)
    const userReactions = getUserReactions(articleId)

    // ユーザーが既にこのリアクションをしているかチェック
    if (userReactions.includes(reactionName)) {
      return false // 既にリアクション済み
    }

    // リアクションカウントを増加
    reactions[reactionName] = (reactions[reactionName] || 0) + 1
    
    // ユーザーのリアクション履歴に追加
    userReactions.push(reactionName)

    // 保存
    saveReactions(articleId, reactions)
    saveUserReactions(articleId, userReactions)

    return true
  }

  // リアクションを削除
  const removeReaction = (articleId: string | number, reactionName: string) => {
    const reactions = getReactions(articleId)
    const userReactions = getUserReactions(articleId)

    // ユーザーがこのリアクションをしているかチェック
    const reactionIndex = userReactions.indexOf(reactionName)
    if (reactionIndex === -1) {
      return false // リアクションしていない
    }

    // リアクションカウントを減少
    if (reactions[reactionName] && reactions[reactionName] > 0) {
      reactions[reactionName] -= 1
      if (reactions[reactionName] === 0) {
        delete reactions[reactionName]
      }
    }

    // ユーザーのリアクション履歴から削除
    userReactions.splice(reactionIndex, 1)

    // 保存
    saveReactions(articleId, reactions)
    saveUserReactions(articleId, userReactions)

    return true
  }

  // リアクションをトグル
  const toggleReaction = (articleId: string | number, reactionName: string) => {
    const userReactions = getUserReactions(articleId)
    
    if (userReactions.includes(reactionName)) {
      return removeReaction(articleId, reactionName)
    } else {
      return addReaction(articleId, reactionName)
    }
  }

  // 総リアクション数を取得
  const getTotalReactions = (articleId: string | number) => {
    const reactions = getReactions(articleId)
    return Object.values(reactions).reduce((sum: number, count: number) => sum + count, 0)
  }

  // ユーザーがリアクションしているかチェック
  const hasUserReacted = (articleId: string | number, reactionName: string) => {
    const userReactions = getUserReactions(articleId)
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