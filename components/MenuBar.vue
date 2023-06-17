<template>
  <div class="menu-container mt-3">
    <Button @click="routeBack" class="ml-2" type="button" label="Назад" icon="pi pi-arrow-left" outlined />
    <slot></slot>
    
  </div>
</template>


<script>
export default {
  methods:{
    routeBack(){// Ломает аватиарку если запускать в сеть
      let arrPath = this.$route.path.split('/')
      arrPath.pop()
      if (arrPath.length == 1) {
        arrPath = '/'
      }
      else {
        arrPath = arrPath.join('/')
      }
      this.$router.push({path: arrPath, replace: true})
    }
  }
}
</script>


<style lang="scss">
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
</style>