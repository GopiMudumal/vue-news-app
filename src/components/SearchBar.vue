<template>
  <div class="search">
    <input type="text" v-model="query" placeholder="Search news..." />
    <select v-model="country" id="select country">
      <option value="">Select Country</option>
      <option
        v-for="country in countries"
        :key="country.countryName"
        :value="country.countryCode"
      >
        {{ country.countryCode }}
      </option>
    </select>
    <select v-model="category" id="category">
      <option value="">Select Category</option>
      <option value="technology">Technology</option>
      <option value="entertainment">Entertainment</option>
      <option value="general">General</option>
      <option value="health">Health</option>
      <option value="science">Science</option>
      <option value="sports">Sports</option>
    </select>
    <button @click="applyFilter">Search</button>
  </div>
</template>

<script setup>
import { getCodeList } from "country-list";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const query = computed({
  get: () => store.getters.query,
  set: (value) => store.commit("SET_QUERY", value),
});

const country = computed({
  get: () => store.getters.country,
  set: (value) => store.commit("SET_COUNTRY", value),
});

const category = computed({
  get: () => store.getters.category,
  set: (value) => store.commit("SET_CATEGORY", value),
});

const countries = Object.entries(getCodeList()).map(([code, name]) => ({
  countryCode: code,
  countryName: name,
}));

const applyFilter = async () => {
  await store.dispatch("fetchFilteredNews");
};
</script>

<style scoped>
.search {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  padding: 10px;
  box-sizing: border-box;
}

input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  flex: 1 1 20%;
  max-width: 300px;
  min-width: 120px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
