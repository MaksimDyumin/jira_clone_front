<template>
  <div class="cont">
    <h1> Room with id: {{ $route.params.id }}</h1>
    <MenuBar>
      <Button @click="visible = true" class="ml-4" type="button" label="Создать доску" icon="pi pi-plus" outlined />
      
      <Button @click="$router.push(`${$route.params.id}/edit`)" class="ml-4" type="button" label="Редактирование" icon="pi pi-pencil" outlined /> <!--  @click="$router.push(`RoomList/${$router.params}`)" -->
    </MenuBar>

    <div class="flex flex-wrap cards-container mt-2">
      <div v-for="room in desks" class="col-12 md:col-6 lg:col-4 flex flex-column text-center card-container">
        <Card class="cursor-pointer">
          <template #title>
           {{room.title}}
           
          </template>
        </Card>
      </div>
    </div>
    <Dialog v-model:visible="visible" modal header="Header" :draggable="false" :style="{ width: '50vw' }">
      <p class="text-red-500"></p> <!-- {{ roomsStore.createRoomErros[0] }} -->
      <div class="mt-2">
        <InputText class="w-full" v-model="titleNewRoom" placeholder="Имя доски" />
      </div>
      <template #footer>
        <Button label="Создать доску" icon="pi pi-check" @click="createDesk" text />
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import {useDesksStore} from '~/stores/desks'
import {useRoomsStore} from '~/stores/rooms'

export default {
  setup() {
    const desksStore = useDesksStore()
    const roomsStore = useRoomsStore()
    return { desksStore, roomsStore }
  },
  components:{
    Dialog, InputText,
    Card
  },
  async mounted(){
    const responseStatus = await this.roomsStore.fetchRoom(this.$route.params.id)
  },
  data() {
    return {
      visible: false,
      titleNewDesk: '',
      desks: [
        {
          title: 'i am gay'
        }
      ]
    }
  },
  methods:{
    createDesk(){

    }
  },
  // computed:{
  //   roomsPreviewList(){
  //     return this.desksStore.desksPreview
  //   }
  // }
}
</script>

<style>


</style>