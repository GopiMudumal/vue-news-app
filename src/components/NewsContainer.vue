<template>
  <div class="news-container">
    <h2>News Articles</h2>
    <LoadingIndicator v-if="loading && !articles.length" />
    <div v-else class="news-list">
      <div v-if="!articles.length">No Results Found</div>
      <NewsItem
        v-for="article in articles"
        :key="article.title"
        :article="article"
        @click="goToDetails(article)"
      />
    </div>
    <LoadingIndicator v-if="loading && articles.length" />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import NewsItem from "./NewsItem.vue";
import LoadingIndicator from "./LoadingIndicator.vue";

const store = useStore();
const router = useRouter();

const articles = computed(() => store.getters.articles);
const loading = computed(() => store.getters.loading);

const fetchFilteredNews = async () => {
  await store.dispatch("fetchFilteredNews");
};

const loadMoreArticles = async () => {
  await store.dispatch("loadMoreArticles");
};

const goToDetails = (article) => {
  const articleId = article.title;
  router.push({ name: "NewsDetails", params: { id: articleId } });
};

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollHeight - scrollTop <= clientHeight + 5 && !loading.value) {
    loadMoreArticles();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  fetchFilteredNews();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
.news-container {
  margin: 20px;
}
.news-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
