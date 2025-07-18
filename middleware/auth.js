export default defineNuxtRouteMiddleware((to) => {
  const { canPostArticle } = useAuth()
  
  // 記事投稿ページへのアクセスを制限
  if (to.path === '/articles/new' && !canPostArticle.value) {
    return navigateTo('/login?redirect=' + to.path)
  }
})