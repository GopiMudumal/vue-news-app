<template>
  <div class="news-container">
    <h2>{{ bookmarks.length || 0 }} News Result (s)</h2>
    <LoadingIndicator v-if="loading && !bookmarks.length" />
    <div v-else class="news-list">
      <h1 v-if="!bookmarks.length">No Results Found</h1>
      <NewsItem
        v-for="bookmark in bookmarks"
        :key="bookmark.title"
        :article="bookmark"
        @view-page="goToDetails"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import NewsItem from "@/components/NewsItem.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";

const store = useStore();
const router = useRouter();

const bookmarks = computed(() => store.getters.bookMarks);

onMounted(() => {
  store.commit("SET_SHOW_FILTER", false);
});

const goToDetails = (bookmark) => {
  const bookmarkId = bookmark.title;
  router.push({ name: "NewsDetails", params: { id: bookmarkId } });
};
</script>

<style scoped>
.news-container {
  margin: 20px;
  margin-top: 120px;
  padding: 50px 0;
}

h2,
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.news-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 0.25fr));
  gap: 20px;
  place-content: center;
}
</style>
