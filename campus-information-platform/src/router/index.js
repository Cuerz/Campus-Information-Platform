import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue'),
      meta: { ispublic: true },
      // children: [
      //   { path: '', name: 'home', component: () => import('@/views/index.vue'), meta: { ispublic: true } },
      // ],
    },
  ],
});
export default router;
