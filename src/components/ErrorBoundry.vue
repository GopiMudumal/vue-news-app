<!-- ErrorBoundary.vue -->
<template>
  <div>
    <slot v-if="!hasError" />
    <div v-else class="error-message">
      <h2>Something went wrong.</h2>
      <button @click="resetError">Try Again</button>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onBeforeUnmount, ref } from "vue";

const hasError = ref(false);

const resetError = () => {
  hasError.value = false;
};

const errorHandler = (error) => {
  console.error("Error caught in ErrorBoundary:", error);
  hasError.value = true;
};

const { app } = getCurrentInstance();
app.config.errorHandler = errorHandler;

// Cleanup on unmount
onBeforeUnmount(() => {
  app.config.errorHandler = null; // Clean up the handler
});
</script>

<style>
.error-message {
  color: red;
  border: 1px solid red;
  padding: 10px;
  margin-top: 10px;
}
</style>
