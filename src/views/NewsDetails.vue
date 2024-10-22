<template>
  <div class="news-details">
    <NewsItem :article="article" />
    <router-link to="/">Back to News List</router-link>
  </div>
</template>

<script setup>
import NewsItem from "@/components/NewsItem.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();
const article = ref({});

onMounted(() => {
  const articleId = route.params.id;
  article.value = store.getters.getArticleById(articleId);
});
</script>

<style>
.news-details {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
