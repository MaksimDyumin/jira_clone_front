import { useUserStore } from "~/stores/user"

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  return userStore.fetchProfileUser()
})
