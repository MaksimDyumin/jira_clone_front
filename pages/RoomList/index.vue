<template>
  <div>
      <MenuBar>
        <Button @click="visible = true" class="ml-4" type="button" label="Создать комнату" icon="pi pi-plus" outlined />
      </MenuBar>

    <div class="flex flex-wrap cards-container mt-2">
      <div v-for="room in roomsStore.roomsPreview" class="col-12 md:col-6 lg:col-4 flex flex-column text-center card-container">
        <Card class="w-full flex flex-column cursor-pointer card-item h-full" @click="$router.push({path:`RoomList/${room.id}` })">

          <template #title>
            <h4 class="m-0">{{room.title}}</h4>
          </template>
          <template #content>
            <Divider class="m-0"></Divider>
            <p class="room-descriprion">{{ roomDescription(room.description) }}{{ threeDot(room.description) }}</p>
            <Divider class="m-0"></Divider>
          </template>

          <template #footer>
            <Participants :listMembers="room.users" />
          </template>
        </Card>
      </div>
    </div>

    <Dialog v-model:visible="visible" modal header="Header" :draggable="false" :style="{ width: '50vw' }">
      <p class="text-red-500">{{ roomsStore.createRoomErros[0] }}</p>
        <div class="mt-2">
          <InputText class="w-full" v-model="titleNewRoom" placeholder="Имя комнаты" />
          <InputText class="w-full mt-3" v-model="newRoomDescription" placeholder="Описание" />
        </div>
        <template #footer>
            <Button label="Создать комнату" icon="pi pi-check" @click="createRoom" text />
        </template>
    </Dialog>
  </div>
</template>


<script>
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Divider from 'primevue/divider';
import Participants from '@/components/Participants.vue'

import { useRoomsStore } from '~/stores/rooms';


export default {
  setup(){
    const roomsStore = useRoomsStore()
    return {roomsStore}
  },
  async mounted(){
    await this.roomsStore.fetchRooms()
  },
  components:{
    Card, Dialog,
    InputText, Divider,
    Participants
  },
  data() {
    return {
      visible: false,
      titleNewRoom: '',
      newRoomDescription: ''
    }
  },
  methods: {
    addRoom(){
      console.log('fn')
    },
    async createRoom(){
      const requestBody = {
        title: this.titleNewRoom,
        description: this.newRoomDescription
      }
      const responseStatus = await this.roomsStore.createRoom(requestBody)

      if (responseStatus) {
        this.visible = false
      }
    },

    roomDescription(str){
      if (str.length > 53){
        return str.substr(0, 47)
      }
      if(str === ''){
        return 'Описание комнаты пусто'
      }
      return str
    },
    threeDot(str){
      if (str.length > 47){
        return '...'
      }
      return ''
    }
  },
}
</script>

<style lang="scss">

.card-container{
  height: 252px;
}

.card-item:hover{
  background-color:  #f8f8f8;
}
.card-item{
  background: url('@/assets/imgs/bc22.jpg'), #FFFFFF;
  background-size: contain;
  font-family: 'Montserrat';
  
  .room-descriprion{
    margin: 10px 0;
    min-height: 50px;
  }

  h4{
    font-size: 22px;
    height: 77px;
  }
  p{
    font-size: 18px;
    font-weight: 300;
  }
}

.p-card-footer{
  padding: 0!important;
}
.p-card-title{
  margin: 0!important;
}
.p-card-content{
  padding: 10px 0!important;
}
</style>