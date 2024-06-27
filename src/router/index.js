import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "app",
      component: Home,
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/setting",
      name: "setting",
      component: () => import("@/views/Setting.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.path !== from.path) {
      // document.getElementById("bodybox").scrollTo(0, 0);
    }
  },
});

export default router;
