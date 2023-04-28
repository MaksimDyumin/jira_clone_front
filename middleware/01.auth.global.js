import { useUserStore } from "~/stores/user"

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  if (to.meta.needAuth) {
    return userStore.fetchProfileUser()
  }
  return
})
