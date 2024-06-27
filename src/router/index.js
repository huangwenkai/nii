import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    // },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: () => import("../views/Login.vue"),
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.path !== from.path) {
      // document.getElementById("bodybox").scrollTo(0, 0);
    }
  },
});

export default router;
