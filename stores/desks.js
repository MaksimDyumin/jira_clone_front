import { defineStore } from "pinia"


export const useDesksStore = defineStore('desks', {
  
  state: () => ({ 
    desksPreview: [],
    deskDetail: {},
    createDeskErros: ''
  }),


  getters: {
  },


  actions: {
    async fetchDesk() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.get('profile/rooms/desks')
        this.roomsPreview = response.data
        return true
      } catch (error) {
        return false
      }
    },
  }
})