import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/error/404.vue"),
      meta: { title: "页面迷路啦" },
    },
    {
      path: "/login",
      component: () => import("@/views/login.vue"),
      meta: { title: "登录" },
    },
    {
      path: "/register",
      component: () => import("@/views/register.vue"),
      meta: { title: "注册" },
    },
    {
      path: "/",
      name: "index",
      component: () => import("@/views/index.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/home/index.vue"),
          meta: { title: "首页" },
        },
        {
          path: "activity",
          name: "activity",
          component: () => import("@/views/activity/index.vue"),
          meta: { title: "活动中心" },
        },
        {
          path: "announcement",
          name: "announcement",
          component: () => import("@/views/announcement/index.vue"),
          meta: { title: "公告/文章" },
        },
        {
          path: "lost",
          name: "lost",
          component: () => import("@/views/lost/index.vue"),
          meta: { title: "失物认领" },
        },
        {
          path: "old",
          name: "old",
          component: () => import("@/views/old/index.vue"),
          meta: { title: "二手交易" },
        },
        {
          path: "recruit",
          name: "recruit",
          component: () => import("@/views/recruit/index.vue"),
          meta: { title: "招聘" },
        },
        {
          path: "user",
          name: "user",
          component: () => import("@/views/user/index.vue"),
          meta: { title: "个人中心" },
        },
      ],
    },
  ],
});
export default router;
