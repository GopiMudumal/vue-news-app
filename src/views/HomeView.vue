<template>
  <div class="home">
    <NewsContainer />
  </div>
</template>

<script setup>
import NewsContainer from "@/components/NewsContainer.vue";
import { onMounted, onBeforeUnmount, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const loading = computed(() => store.getters.loading);

const fetchFilteredNews = async () => {
  await store.dispatch("fetchFilteredNews");
};

const loadMoreArticles = async () => {
  await store.dispatch("loadMoreArticles");
};

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollHeight - scrollTop <= clientHeight + 5 && !loading.value) {
    loadMoreArticles();
  }
};

onMounted(() => {
  store.commit("SET_SHOW_FILTER", true);
  window.addEventListener("scroll", handleScroll);
  fetchFilteredNews();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
