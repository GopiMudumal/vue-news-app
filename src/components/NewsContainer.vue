<template>
  <div class="news-container">
    <h2>{{ totalResults }} News Result (s)</h2>
    <LoadingIndicator v-if="loading && !articles.length" />
    <div v-else class="news-list">
      <div v-if="!articles.length">No Results Found</div>
      <NewsItem
        v-for="article in articles"
        :key="article.title"
        :article="article"
        @view-page="goToDetails"
      />
    </div>
    <LoadingIndicator v-if="loading && articles.length" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import NewsItem from "./NewsItem.vue";
import LoadingIndicator from "./LoadingIndicator.vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const articles = computed(() => store.getters.articles);
const totalResults = computed(() => store.getters.totalResults);
const loading = computed(() => store.getters.loading);

const goToDetails = (article) => {
  const articleId = article.title;
  store.commit("ADD_BOOKMARKS", article);
  router.push({ name: "NewsDetails", params: { id: articleId } });
};
</script>

<style scoped>
.news-container {
  margin: 20px;
  margin-top: 120px;
  padding: 50px 0;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
.news-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  place-content: center;
}

@media only screen and (max-width: 480px) {
  .news-container {
    margin-top: 300px;
  }
}
</style>
