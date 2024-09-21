import { createRouter, createWebHistory } from "vue-router";
import { ref } from "vue";
import NotFound from "@/views/404/NotFound.vue";
const routes = [
  {
    path: "/",
    component: () => import("@/views/home/Home.vue"),
    name: "home",
  },
  {
    path: "/register",
    component: () => import("@/views/auth/Register.vue"),
    name: "register",
    // meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: () => import("../views/auth/Login.vue"),
    name: "login",
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    name: "404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("auth_token");

  const action = ref(false);
  if (token != null) action.value = true;

  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next("/login");
  } else if ((to.name == "login" || to.name == "register") && token) {
    next("/");
  } else {
    next();
  }
});

export default router;
