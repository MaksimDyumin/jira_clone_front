import { defineStore } from "pinia"
import axios from "axios";


export const useUserStore = defineStore('user', {
  
  state: () => ({ 
    user: {},
    loggedIn: false,
    logginError: ''
  }),


  getters: {
    gettersUser: (state) => state.user,
    gettersLoggedIn: (state) => state.loggedIn
  },


  actions: {
    async login(requestBody) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.post('token/', requestBody)
        const accessToken = useCookie('accessToken')
        const refreshToken = useCookie('refreshToken')

        accessToken.value = response.data.access
        refreshToken.value = response.data.refresh

        await this.fetchProfileUser()
        return true
      } catch (error) {
        this.logginError = error?.response?.data?.detail
        console.log(this.logginError)
        return false
      }
    },


    logout(){
      const accessToken = useCookie('accessToken')
      const refreshToken = useCookie('refreshToken')
      accessToken.value = null
      refreshToken.value = null

      this.user = {}
      this.loggedIn = false
    },


    async fetchProfileUser(){
      const { $api } = useNuxtApp();
      try {
        const response = await $api.get('profile/')
        this.user = response.data
        this.loggedIn = true

      } catch (error) {
        console.error(error)
      }
    },


    async registerUser(requestBody){
      const { $api, $publicClient } = useNuxtApp();
      try {
        const response = await $publicClient.post('register/', requestBody)
      } catch (error) {
        console.error(error)
      }
    },


    async changeAvatar(requestBody){
      const { $api, $publicClient } = useNuxtApp();
      try {
        const response = await $api.post('profile/picture/', requestBody,
        {headers: {'Content-Type': 'multipart/form-data',}})
        await this.fetchProfileUser()
      } catch (error) {
        console.error(error)
      }
    },
  }
})