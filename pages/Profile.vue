<template>
  <div>
    <h1>Profile</h1>
    
    <Card>
      <template #title> {{userStore?.user?.username}} </template>
      <template #content>
        <div @click="$refs.invisible_input.click()" class="user-avatar cursor-pointer">
          <!-- <Image :src="userStore?.user?.picture" alt="Profile Image" preview /> -->
          <img :src="userStore?.user?.picture" alt="Profile Avatar">
        </div>
      </template>
    </Card>
    <input class="invisible-input" @change="changeAvatar" accept="image/png, image/jpeg" ref="invisible_input" type="file">
    <Button class="mt-4" @click="exit" >Выход</Button>
  </div>
</template>

<script>
import { useUserStore } from '~/stores/user';
import Card from 'primevue/card';
import Image from 'primevue/image';

export default {
  setup() {
    const userStore = useUserStore()
    return {userStore}
  },
  components:{
    Card, Image
  },
  data() {
    return {
      newAvatar: {}
    }
  },
  methods:{
    exit(){
      this.userStore.logout()
      this.$router.push('/')
    },
    showVal(){
      console.log(this.$refs.invisible_input.files)
    },
    changeAvatar(){
      const formData = new FormData();
      formData.append('picture',this.$refs.invisible_input.files[0])
      this.userStore.changeAvatar(formData)
    },
  }
}
</script>


<style scoped lang="scss">
.user-avatar{
  width: 150px;
  height: 150px;
  border-radius: 5px;
  overflow: hidden;

  img{
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}

.invisible-input{
  display: none;
}
</style>