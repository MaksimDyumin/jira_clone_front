<template>
  <div class="px-5 header-container">
    <div class="flex justify-content-between align-content-center">
      <div @click="$router.push('/')" class="img-container cursor-pointer p-2">
        <img width="90" height="90" src="@/assets/imgs/logo.svg" alt="">
      </div>
      <div class="flex justify-content-between align-content-center">

        <nav class="flex align-items-center lg-nav">

          <Button @click="$router.push('/roomList')" class="mr-3" style="font-size: 17px;" label="Список комнат" text />
          <div v-if="!userStore.loggedIn" class="w-2rem h-2rem flex align-items-center border-round-md box-shadow-default">
            <router-link
              class="link color-second" :to="'/login'"><img class="login-img" src="@/assets/icons/login-svg.svg" alt="">
            </router-link>
          </div>
          
          <div @click="$router.push('/profile')" v-if="userStore.loggedIn" class="avatar-container">
            <img :src="userStore.user.picture" alt="profile pic">
          </div>
        </nav>

        <!-- <nav class="navbar navbar-dark d-md-none">
          <button class="navbar-toggler " type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </nav> -->

      </div>
    </div>
    <!-- <div class="collapse d-md-none" id="navbarToggleExternalContent">
      <div class="p-4 bg-color-third d-flex flex-column">
        <router-link class="p-1 color-second link" :to="'/newCat'">Добавить кота</router-link>
        <router-link class="p-1 color-second link" :to="'/'">Список котов</router-link>
        <router-link class="p-1 color-second link" :to="'/'">Чат</router-link>
      </div>
    </div> -->
  </div>
</template>

<script>
import { useUserStore } from '~/stores/user'

export default {
  setup(){
    const userStore = useUserStore()

    return {userStore}
  },
  data() {
    return {
      loggin: false
    }
  },
}
</script>

<style lang="scss">
$first: #EAE7DC;
$second: #E85A4F;
$third: #D8C3A5;

.header-container{
  background: #ffffff;
  color: #495057;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
  text-align: center;
  position: fixed;
  width: 100%;
  z-index: 100;
}

.p-button.p-button-text:enabled:hover{
  background: rgba(99, 102, 241, 0.08);
  color: #6366F1;
  border-color: transparent;
}
.login-img{
  width: 25px;
  height: 25px;
}

.lg-nav{
  
  a{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  .avatar-container{
    width: 40px;
    height: 40px;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;

    img{
      object-fit: fill;
      width: 100%;
      height: 100%;
    }
  }
}

.link {
  text-decoration: none;
  color: #000;
  font-size: 20px;
  font-weight: bold;
}
//#4cff94
 .box-shadow-default:hover{
    background: rgba(99, 102, 241, 0.08);
    color: #6366F1;
    border-color: transparent;
 }
</style>