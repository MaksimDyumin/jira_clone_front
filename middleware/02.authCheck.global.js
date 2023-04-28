import { useUserStore } from "~/stores/user"

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()

  if(to.meta.needAuth && !userStore.loggedIn){
    return navigateTo('/login') 
  }
})
