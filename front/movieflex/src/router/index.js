import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/best",
      name: "best",
      component: () => import("@/views/BestView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/user/LoginView.vue"),
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/user/logoutView.vue"),
    },
    {
      path: "/signup",
      name: "signUp",
      component: () => import("@/views/user/SignupView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/user/ProfileView.vue"),
    },
    {
      path: "/:moviePk",
      name: "detail",
      component: () => import("@/views/movie/MovieDetailView.vue"),
    },
    {
      path: "/movie-zips",
      name: "MovieZips",
      component: () => import("@/views/movie/MovieZipListView.vue"),
    },
    {
      path: "/movie-zips/:movieZipPk",
      name: "MovieZipDetail",
      component: () => import("@/views/movie/MovieZipDetailView.vue"),
    },
    {
      path: "/movie-zip",
      name: "MovieZipCreate",
      component: () => import("@/views/movie/MovieZipCreateView.vue"),
    },
    {
      path: "/articles",
      name: "Articles",
      component: () => import("@/views/article/ArticleListView.vue"),
    },
    {
      path: "/articles/:articlePk",
      name: "ArticleDetail",
      component: () => import("@/views/article/ArticleDetailView.vue"),
    },
    {
      path: "/article",
      name: "ArticleCreate",
      component: () => import("@/views/article/ArticleCreateView.vue"),
    },
    {
      path: "/recommend",
      name: "Recommend",
      component: () => import("@/views/recommend/RecommendView.vue"),
    },
  ],
});

export default router;
