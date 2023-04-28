import { defineStore } from "pinia"
import axios from "axios";


export const useRoomsStore = defineStore('rooms', {
  
  state: () => ({ 
    roomsPreview: [],
    roomDetail: {},
    
  }),


  getters: {
    gettersRoomsPreview: (state) => state.user,
    gettersRoomDetail: (state) => state.loggedIn
  },


  actions: {
    async fetchRooms() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.get('profile/rooms/')
        this.roomsPreview = response.data
        return true
      } catch (error) {

        return false
      }
    },
  }
})