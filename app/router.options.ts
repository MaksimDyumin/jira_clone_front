import type { RouterConfig } from '@nuxt/schema'


export default <RouterConfig> {
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/index.vue').then(r => r.default || r),
      meta:{
        layout: 'default',
      }
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('~/pages/Login.vue').then(r => r.default || r),
      meta:{
        layout: 'authorization'
      }
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('~/pages/Register.vue').then(r => r.default || r),
      meta:{
        layout: 'authorization'
      }
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('~/pages/Profile.vue').then(r => r.default || r),
      meta:{
        layout: 'default',
        needAuth: true,
      }
    },
    {
      name: 'roomList',
      path: '/RoomList',
      component: () => import('~/pages/RoomList/index.vue').then(r => r.default || r),
      meta:{
        layout: 'default',
        needAuth: true,
      }
    },
    {
      name: 'roomDetail',
      path: '/RoomList/:id',
      component: () => import('~/pages/RoomList/[id].vue').then(r => r.default || r),
      meta:{
        layout: 'default',
        needAuth: true,
      }
    },//component: () => import('~/pages/RoomList/RoomDetail.vue').then(r => r.default || r),
    {
      name: 'desks',
      path: '/RoomList/:roomId/desks/:deskId',
      component: () => import('~/pages/desks/[id].vue').then(r => r.default || r),
      meta:{
        layout: 'default',
        needAuth: true,
      }
    },
  ],
}
// export default undefined