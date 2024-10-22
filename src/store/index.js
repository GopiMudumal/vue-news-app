import { fetchNews } from "@/services/newsService";
import { createStore } from "vuex";

export default createStore({
  state: {
    articles: [],
    loading: false,
    query: "",
    country: "us",
    category: "",
    page: 1,
    totalPage: 0,
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    SET_QUERY(state, query) {
      state.query = query;
    },
    SET_COUNTRY(state, country) {
      state.country = country;
    },
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    ADD_ARTICLES(state, articles) {
      state.articles = [...state.articles, ...articles];
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    INCREMENT_PAGE(state) {
      state.page++;
    },
    SET_TOTAL_PAGE(state, total) {
      state.totalPage = total;
    },
    RESET_STATE(state) {
      state.articles = [];
      state.loading = false;
      state.page = 1;
      state.totalPage = 0;
      state.query = "";
      state.category = "";
      state.country = "";
    },
  },
  getters: {
    articles: (state) => state.articles,
    loading: (state) => state.loading,
    query: (state) => state.query,
    category: (state) => state.category,
    country: (state) => state.country,
    getArticleById: (state) => (id) => {
      return state.articles.find((article) => article.title === id);
    },
  },
  actions: {
    async fetchFilteredNews({ commit, state }) {
      commit("SET_LOADING", true);
      console.log({ state });
      try {
        const { articles, totalResults } = await fetchNews(
          state.query,
          state.country,
          state.category,
          1
        );
        commit("SET_ARTICLES", articles);
        commit("SET_TOTAL_PAGE", Math.ceil(totalResults / 10));
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async loadMoreArticles({ state, commit }) {
      if (state.loading || state.page >= state.totalPage) return;

      commit("SET_LOADING", true);
      try {
        const { articles: newArticles } = await fetchNews(
          state.query,
          state.country,
          state.category,
          state.page + 1
        );
        commit("ADD_ARTICLES", newArticles);
        commit("INCREMENT_PAGE");
        console.log(state.articles);
      } catch (error) {
        console.error("Failed to load more articles:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
});
