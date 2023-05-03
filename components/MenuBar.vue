<template>
  <div class="menu-container mt-3">
    <Button @click="$router.go(-1)" class="ml-2" type="button" label="Назад" icon="pi pi-arrow-left" outlined />
    <slot></slot>
    
  </div>
</template>


<script>
export default {

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