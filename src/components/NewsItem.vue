<template>
  <div
    v-if="article.content !== '[Removed]'"
    :class="['news-item', showInfo ? 'show-info-container' : '']"
  >
    <img
      :src="article.urlToImage"
      alt="Thumbnail"
      class="news-thumbnail"
      v-if="article.urlToImage"
    />
    <img
      src="../assets/no-image.png"
      alt="Thumbnail"
      class="news-thumbnail"
      v-else
    />
    <div class="news-content">
      <h2 class="news-title">{{ article.title }}</h2>
      <p class="author">{{ article.author || "Unknown" }}</p>
      <p class="description">
        <strong>Description: </strong> {{ article.description || "Unknown" }}
      </p>
      <p class="content" v-show="showInfo">
        <strong>Content: </strong> {{ article.content || "Unknown" }}
      </p>
      <div class="button-group" v-show="!showInfo">
        <button class="go-to-page" @click="handleClick(article)">
          Go to Page
        </button>
        <img
          class="bookmark-icon"
          :src="isBookMarked ? openBookmarkIcon : saveBookmarkIcon"
          alt="bookmark-icon"
          @click="addBookMark"
        />
      </div>
    </div>
    <p class="published" v-show="!showInfo">
      Published :
      {{ new Date(article.publishedAt).toLocaleDateString() }}
    </p>
  </div>
</template>

<script setup>
import { computed, defineProps, watch } from "vue";
import { useStore } from "vuex";
import openBookmarkIcon from "../assets/open-bookmark.png";
import saveBookmarkIcon from "../assets/save-instagram.png";

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
  showInfo: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["view-page"]);
const store = useStore();

const isBookMarked = computed(() =>
  store.getters.isBookmarked(props.article.title)
);

// Watch for changes in isBookMarked
watch(isBookMarked, (newValue) => {
  console.log(`Bookmark status updated: ${newValue}`);
  // You can also perform other actions here when the bookmark status changes
});

const handleClick = (article) => {
  emit("view-page", article);
};

const addBookMark = () => {
  if (isBookMarked.value) {
    store.commit("REMOVE_BOOKMARK", props.article.title); // Adjust action as needed
  } else {
    store.commit("ADD_BOOKMARK", props.article); // Adjust action as needed
  }
};
</script>

<style>
.news-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px;
}

.show-info-container {
  max-width: 1000px;
  padding: 30px 20px;
  align-items: center;
}

.show-info-container .news-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  padding: 30px 20px;
  justify-content: center;
}

.show-info-container .news-thumbnail {
  max-width: 500px;
  border-radius: 5px;
}
.go-to-page {
  padding: 10px 15px;
  background-color: #493628;
  color: #fff;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.bookmark-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.news-thumbnail {
  width: 100%;
  height: 250px;
  object-fit: fill;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.news-content {
  padding: 10px;
}

.author {
  color: #ccc;
  font-weight: 700;
  padding: 5px 0;
}

.news-title {
  font-size: 1.25rem;
}

.published {
  background-color: #a89c9572;
  padding: 20px 10px;
  font-size: 1rem;
}

/* @media only screen and (max-width: 480px) {

} */
</style>
