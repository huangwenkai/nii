import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.path !== from.path) {
      // document.getElementById("bodybox").scrollTo(0, 0);
    }
  },
});

export default router;
