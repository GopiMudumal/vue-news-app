import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewsDetails from "@/views/NewsDetails.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/news/:id", // Use a dynamic route for the news details
    name: "NewsDetails",
    component: NewsDetails,
    props: true, // Allows route params to be passed as props
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
