export default defineNuxtRouteMiddleware((to, from) => {
  const { isAdmin } = useAuth()
  
  if (!isAdmin.value) {
    return abortNavigation('管理者権限が必要です')
  }
})