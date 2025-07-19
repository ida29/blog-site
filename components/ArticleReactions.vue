<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">この記事の感想</h3>
    
    <div class="flex flex-wrap gap-3 mb-4">
      <button
        v-for="reaction in reactionTypes"
        :key="reaction.name"
        @click="handleReactionClick(reaction.name)"
        :class="[
          'flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 hover:scale-105',
          hasUserReacted(articleId, reaction.name)
            ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-300'
            : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
        ]"
        :title="reaction.label"
      >
        <span class="text-lg">{{ reaction.emoji }}</span>
        <span class="text-sm font-medium">{{ getReactionCount(reaction.name) }}</span>
      </button>
    </div>

    <div v-if="totalReactions > 0" class="text-sm text-gray-600 dark:text-gray-400">
      総リアクション数: {{ totalReactions }}
    </div>
  </div>
</template>

<script setup>
interface Props {
  articleId: string | number
}

const props = defineProps<Props>()

const { 
  reactionTypes, 
  getReactions, 
  toggleReaction, 
  getTotalReactions, 
  hasUserReacted 
} = useReactions()

const reactions = ref({})
const totalReactions = ref(0)

// リアクション数を取得
const getReactionCount = (reactionName: string) => {
  return reactions.value[reactionName] || 0
}

// リアクションをクリックした時の処理
const handleReactionClick = (reactionName: string) => {
  const success = toggleReaction(props.articleId, reactionName)
  if (success) {
    // リアクションデータを再読み込み
    loadReactions()
  }
}

// リアクションデータを読み込み
const loadReactions = () => {
  reactions.value = getReactions(props.articleId)
  totalReactions.value = getTotalReactions(props.articleId)
}

// コンポーネントマウント時にデータを読み込み
onMounted(() => {
  loadReactions()
})
</script>