<template>
  <div class="flex flex-column align-items-center justify-content-center h-full px-5">
    <Card class="login-container w-full md:w-25rem text-center" style="font-size: 17px;">
      <template #title> Login </template>
      <template #content>
        <nuxt-link style="text-decoration: none; color: black;" to="/">
          <i class="pi pi-arrow-left"></i>
          Вернуться к демо
        </nuxt-link>
        <p>Приветствуем вас на странице нашего сервиса!</P>
          <transition>
            <p v-if="userStore.logginError.length > 0" class="text-red-500">{{ userStore.logginError }}</p>
          </transition>
        <div class="flex flex-column align-items-center justify-content-center mt-7">
          <div class="p-input-icon-right w-full">
            <i class="pi pi-envelope" />
            <InputText v-model="email" class="w-full" type="e-mail" placeholder="Логин"></InputText>
          </div>
          <div class="p-input-icon-right w-full mt-4">
            <!-- <i @click="isPassword = !isPassword" class="pi pi-key" /> -->
            <i v-if="isPassword" @click="isPassword = !isPassword" class="pi pi-eye-slash cursor-pointer" />
            <i v-if="!isPassword" @click="isPassword = !isPassword" class="pi pi-eye cursor-pointer" />
            <InputText v-model="password" class="w-full" :type="isPassword ? 'password' : 'text'" placeholder="Пароль">
            </InputText>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex m-auto">
          <Button @click="auth" class="mt-4">Войти</Button>
        </div>
        <div class="flex justify-content-end mt-2">
          <nuxt-link class="text-primary footer-link" to="register">Go to register!</nuxt-link>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { useUserStore } from '~/stores/user'
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';

export default {
  setup() {
    const cookie = useCookie('token')
    const userStore = useUserStore()

    return { cookie, userStore }
  },
  methods: {

    async auth() {
      const requestBody = {
        username: this.email,
        password: this.password
      }
      const responseStatus = await this.userStore.login(requestBody)

      if (!responseStatus) {
        return
      }

      const backRoute = window.history.state.back
      if (backRoute === null || backRoute === '/register') {
        this.$router.push('/')
      }
      else {
        this.$router.go(-1)
      }
    }
    
  },
  components: {
    Card,
    InputText
  },
  mounted() {
    this.userStore.logginError = ''
  },
  data() {
    return {
      isPassword: true,
      email: '',
      password: ''
    }
  },
}
</script>


<style lang="scss">
// .login-container {
//   width: 400px;
//   height: 500px;
// }

.p-card-title {
  text-align: center;
}

.p-card-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.footer-link {
  text-align: end;
}
</style>