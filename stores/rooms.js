import { defineStore } from "pinia"
import axios from "axios";


export const useRoomsStore = defineStore('rooms', {
  
  state: () => ({ 
    roomsPreview: [],
    roomDetail: {},
    createRoomErros: ''
    
  }),


  getters: {
    gettersRoomsPreview: (state) => state.user,
    gettersRoomDetail: (state) => state.loggedIn,
  },


  actions: {
    async fetchRooms() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.get('profile/rooms/')
        this.roomsPreview = response.data
        return true
      } catch (error) {
        this.roomsPreview = []
        return false
      }
    },


    async fetchRoom(roomId) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.get(`profile/rooms/${roomId}`)
        this.roomDetail = response.data
        return true
      } catch (error) {

        if (error.response.status === 404) {
          showError({statusCode: 404, statusMessage: error.response.statusText})
        }
        return false
      }
    },


    async createRoom(requestBody) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.post('profile/rooms/', requestBody)
        this.fetchRooms()
        return true
      } catch (error) {
        if(error.response){
          this.createRoomErros = error?.response?.data?.title
        }
        else{
          this.createRoomErros = error?.message
        }
        return false
      }
    },


    async deleteRoom(roomId) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.delete(`profile/rooms/${roomId}`)
        this.fetchRooms()
        return true
      } catch (error) {
        // if(error.response){
        //   this.createRoomErros = error?.response?.data?.title
        // }
        // else{
        //   this.createRoomErros = error?.message
        // }
        return false
      }
    },
  }
})