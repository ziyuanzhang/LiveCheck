import Vue from "vue";
import VueRouter from "vue-router";
import HomeOrg from "../views/Home.vue";
import Home20220116 from "../views/Home20220116.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home20220116
  },
  {
    path: "/HomeOrg",
    name: "HomeOrg",
    component: HomeOrg
  },
  {
    path: "/download",
    name: "download",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/download.vue")
  },
  {
    path: "/page404",
    name: "page404",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/page404.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
