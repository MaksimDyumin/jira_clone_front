<template>
  <div>
    <AvatarGroup>
      <Avatar v-for="member in limitedListMembers" :image="member.picture" shape="circle" />
      <Avatar v-if="listMembers > 4" :label="'+'+plusUsers" shape="circle"  style="background-color: '#9c27b0', color: '#ffffff'" />
    </AvatarGroup>  
  </div>
</template>


<script>
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';


export default {
  props:{
    listMembers:{
      default: () => [],
      type: Array
    }
  },
  components:{
    Avatar, AvatarGroup
  },
  computed: {
    limitedListMembers(){
      if (this.listMembers.length > 4) {
        return this.listMembers.splice(0, 4)
      }
      return this.listMembers
    },
    plusUsers(){
      const memLen = this?.listMembers?.length
      return memLen > 4 ? memLen - 4 : memLen
    }
  }
}
</script>


<style lang="">
  
</style>