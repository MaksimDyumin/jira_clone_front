import { defineStore } from "pinia"
import axios from "axios";


export const useUserStore = defineStore('user', {
  
  state: () => ({ 
    user: {},
    logginError: '',
    loggedIn: false,
  }),


  getters: {
    // loggedIn: (state) => useCookie('loggedIn').value
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

        if(error.response){
          this.logginError = error?.response?.data?.detail
        }
        else{
          this.logginError = error?.message
        }
        
        return false
      }

    },


    logout(){
      const accessToken = useCookie('accessToken')
      const refreshToken = useCookie('refreshToken')

      accessToken.value = null
      refreshToken.value = null
      this.loggedIn = undefined

      this.user = {}
    },


    async fetchProfileUser(){
      const { $api } = useNuxtApp();
      try {
        const response = await $api.get('profile/')
        this.user = response.data
        this.loggedIn = true
        
      } catch (error) {
        this.loggedIn = false
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