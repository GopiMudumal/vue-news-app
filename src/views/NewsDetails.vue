<template>
  <div class="news-details">
    <NewsItem :article="article" showInfo="true" />
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
  if (articleId) {
    article.value = store.getters.getArticleById(articleId);
  }
  store.commit("SET_SHOW_FILTER", false);
});
</script>

<style scoped>
.news-details {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 140px;
}

@media only screen and (max-width: 380px) {
  .news-details {
    margin-top: 320px;
  }
}
</style>
