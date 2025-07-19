<template>
  <div v-if="headings.length > 0" class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md sticky top-4">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
      </svg>
      目次
    </h3>
    
    <nav class="space-y-1">
      <a
        v-for="heading in headings"
        :key="heading.id"
        :href="`#${heading.anchor}`"
        @click.prevent="scrollToHeading(heading.anchor)"
        :class="[
          'block py-1 text-sm transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400',
          `pl-${(heading.level - 1) * 4}`,
          heading.level === 1 ? 'font-semibold text-gray-900 dark:text-white' :
          heading.level === 2 ? 'font-medium text-gray-800 dark:text-gray-200' :
          'text-gray-600 dark:text-gray-400'
        ]"
      >
        {{ heading.text }}
      </a>
    </nav>
  </div>
</template>

<script setup>
interface Props {
  content: string
}

const props = defineProps<Props>()

const { extractHeadings, scrollToHeading } = useTableOfContents()

const headings = computed(() => {
  return extractHeadings(props.content)
})
</script>

<style scoped>
.pl-0 { padding-left: 0; }
.pl-4 { padding-left: 1rem; }
.pl-8 { padding-left: 2rem; }
.pl-12 { padding-left: 3rem; }
.pl-16 { padding-left: 4rem; }
.pl-20 { padding-left: 5rem; }
</style>