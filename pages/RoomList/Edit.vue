<template>
  <div>
    <h1>Редактирование комнаты с id: {{ $route.params.id }}</h1>
    <MenuBar>
      <Button @click="deleteRoom" class="ml-4" type="button" label="Удалить комнату" icon="pi pi-trash" severity="danger" outlined />
    </MenuBar>
  </div>
</template>


<script>
import {useRoomsStore} from '~/stores/rooms'

export default {
  setup(){
    const roomStore = useRoomsStore()
    return {roomStore}
  },
  methods:{
    async deleteRoom(){
      const responseStatus = await this.roomStore.deleteRoom(this.$route.params.id)
      if (responseStatus) {
        this.$router.push('/RoomList')
      }
    }
  }
}
</script>


<style lang="scss">
  
</style>