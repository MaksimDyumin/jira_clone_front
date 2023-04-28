<template>
  <div>
    <h1>Список комнат</h1>
      <div class="menu-container">
        <Button @click="addRoom" class="ml-2" type="button" label="Назад" icon="pi pi-arrow-left" outlined />
        <Button @click="addRoom" class="ml-4" type="button" label="Создать комнату" icon="pi pi-plus" outlined />
      </div>

    <div class="flex flex-wrap cards-container">

      <div v-for="room in roomsStore.roomsPreview" class="col-12 md:col-6 lg:col-4 flex flex-column text-center" style="height: 256px;">
        <Card class="w-full flex flex-column cursor-pointer card-container h-full" @click="$router.push('/roomView')">
          <template #title> <p class="m-0">{{room.title}}</p>  </template>
        </Card>
      </div>
      
    </div>
    
  </div>
</template>


<script>
import Card from 'primevue/card';
import { useRoomsStore } from '~/stores/rooms';


export default {
  setup(){
    definePageMeta({
      needAuth: true
    })
    const roomsStore = useRoomsStore()
    return {roomsStore}
  },
  async mounted(){
    await this.roomsStore.fetchRooms()
  },
  components:{
    Card
  },
  methods: {
    addRoom(){
      console.log('fn')
    }
  },
}
</script>

<style lang="scss">
.card-container:hover{
  background-color:  #f8f8f8;
}

.menu-container{
  background: white;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
  width: calc(100% - 16px);
  margin-left: 8px;
}

// background: white;
// display: flex;
// align-items: center;
// border-radius: 5px;
// box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
// height: 60px;
</style>