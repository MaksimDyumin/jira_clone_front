<template>
  <div class="flex flex-column align-items-center justify-content-center h-full px-5"> 
    <Card class="login-container w-full md:w-25rem text-center" style="font-size: 17px;">
      <template #title> Register </template>
      <template #content>
        <nuxt-link
        style="text-decoration: none; color: black;" 
        to="/"
        >
          <i class="pi pi-arrow-left"></i>
          Вернуться к демо
        </nuxt-link>
        <p>Приветствуем вас на странице нашего сервиса!</P>
          <p class="text-red-500">{{ error }}</p>
        <div class="flex flex-column align-items-center justify-content-center mt-7">
          <div class="p-input-icon-right w-full" style="text-align: start;">
            <i class="pi pi-envelope m-auto" />
            <label class="ml-1" for="">Логин</label>
            <InputText v-model="email" class="w-full" type="e-mail" placeholder="Логин"></InputText>
          </div>

          <div class="p-input-icon-right w-full mt-4" style="text-align: start;">
            <!-- <i @click="isPassword = !isPassword" class="pi pi-key" /> -->
            <i v-if="isPassword" @click="isPassword = !isPassword" class="pi pi-eye-slash m-auto cursor-pointer" />
            <i v-if="!isPassword" @click="isPassword = !isPassword" class="pi pi-eye m-auto cursor-pointer" />
            <label class="ml-1" for="">Пароль</label>
            <InputText v-model="password" class="w-full" :type="isPassword ?  'password' : 'text'" placeholder="Пароль"></InputText>
          </div>

          <div class="p-input-icon-right w-full mt-4" style="text-align: start;">
            <!-- <i @click="isPassword = !isPassword" class="pi pi-key" /> -->
            <i v-if="isPassword" @click="isPassword = !isPassword" class="pi pi-eye-slash m-auto cursor-pointer" />
            <i v-if="!isPassword" @click="isPassword = !isPassword" class="pi pi-eye m-auto cursor-pointer" />
            <span class="ml-1" for="">Повтор пароля</span>
            <InputText v-model="passwordConfirm" class="w-full" :type="isPassword ?  'password' : 'text'" placeholder="Повтор пароля"></InputText>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex m-auto">
          <Button @click="register" class="mt-4">Войти</Button>
        </div>
        <div class="flex justify-content-end mt-2">
          <nuxt-link class="text-primary footer-link mt-2" to="login">Go to login!</nuxt-link>
        </div>
    </template>
    </Card>
  </div>
</template>

<script>
import { useUserStore } from '~/stores/user';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';

export default {
  setup() {
    const userStore = useUserStore()
    return {userStore}
  },
  components: {
    Card,
    InputText
  },
  data() {
    return {
      isPassword: true,
      email: '',
      password: '',
      passwordConfirm: '',
      error: ''
    }
  },
  methods:{
    async register(){
      if (this.password === this.passwordConfirm) {
        this.error = ''
        const requestBody = {
          username: this.email,
          password: this.password
        }
        await this.userStore.registerUser(requestBody)
        await this.userStore.login(requestBody)

        this.$router.push('/')
      } else {
        this.error = 'Пароли не совпадают'
      }
    }
  }
}
</script>


<style lang="scss">
// .login-container {
//   width: 400px;
//   height: 500px;
// }

.p-card-title{
  text-align: center;
}
.p-card-footer{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.footer-link{
  font-size: 15px;
  text-decoration: none;
  text-align: end;
}
</style>