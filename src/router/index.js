import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewsDetails from "@/views/NewsDetails.vue";
import BookmarkView from "@/views/BookmarkView.vue";
import TopNews from "@/views/TopNews.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/news/:id", // Using a dynamic route for the news details
    name: "NewsDetails",
    component: NewsDetails,
    props: true, // Allows route params to be passed as props
  },
  {
    path: "/bookmarks",
    name: "Bookmarks",
    component: BookmarkView,
  },
  {
    path: "/top-news",
    name: "TopNews",
    component: TopNews,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
