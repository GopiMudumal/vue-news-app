<template>
  <div
    v-if="article.content !== '[Removed]'"
    class="news-item"
    @click="handleClick"
  >
    <img
      :src="article.urlToImage"
      alt="Thumbnail"
      class="news-thumbnail"
      v-if="article.urlToImage"
    />
    <h2>{{ article.title }}</h2>
    <p><strong>Author:</strong> {{ article.author || "Unknown" }}</p>
    <p>
      <strong>Published At:</strong>
      {{ new Date(article.publishedAt).toLocaleDateString() }}
    </p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["handleClick"]);

const handleClick = () => {
  emit("click");
};
</script>

<style>
.news-item {
  border: 1px solid #ddd;
  padding: 20px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: pointer;
}

.news-thumbnail {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.news-title {
  font-size: 20px;
  margin: 10px 0;
}
</style>
