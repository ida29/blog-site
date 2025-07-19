export default defineNuxtRouteMiddleware((to, from) => {
  const { isAdmin } = useAuth()
  
  if (!isAdmin.value) {
    throw createError({
      statusCode: 403,
      statusMessage: '管理者権限が必要です'
    })
  }
})