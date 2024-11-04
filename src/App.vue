<template>
  <!-- <nav><router-link to="/">Home</router-link></nav> -->
  <ErrorBoundary>
    <HeaderSection />
    <router-view />
  </ErrorBoundary>
</template>

<script setup>
import HeaderSection from "./components/HeaderSection.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  text-decoration: none;
}
</style>
