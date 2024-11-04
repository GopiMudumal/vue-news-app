<template>
  <header>
    <nav>
      <router-link to="/"><h1>Vue News Search & Bookmarks</h1></router-link>
      <div>
        <router-link to="/top-news"><h4>Top News</h4></router-link>
        <router-link to="/bookmarks"><h4>Bookmarks</h4></router-link>
      </div>
    </nav>
    <div v-show="showFilter">
      <SearchBar />
    </div>
  </header>
</template>

<script setup>
import { useStore } from "vuex";
import SearchBar from "./SearchBar.vue";
import { computed } from "vue";
const store = useStore();

const showFilter = computed(() => store.getters.showFilter);
</script>

<style scoped>
header {
  width: 100%;
  position: fixed;
  top: 0;
}
nav {
  min-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 50px;
  gap: 20px;
  background-color: #493628;
}

nav > div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 50px;
}

h1 {
  flex: 1;
}

h1,
h4,
h4 {
  color: rgba(255, 255, 255, 0.427);
  font-weight: bold;
}

nav a.router-link {
  text-decoration: none;
}

nav a.router-link-exact-active {
  text-decoration: none;
}

nav a.router-link-active > h1,
nav a.router-link-active > h4 {
  color: white;
}

@media only screen and (max-width: 480px) {
  nav {
    width: 100%;
    min-height: 70px;
    padding: 20px 10px;
    justify-content: center;
  }

  h1 {
    font-size: 1.5rem;
  }
}

@media only screen and (max-width: 380px) {
  h1 {
    font-size: 1.25rem;
  }
}
</style>
