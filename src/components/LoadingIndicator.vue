<template>
  <div class="loading-indicator">Loading...</div>
</template>

<style scoped>
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
