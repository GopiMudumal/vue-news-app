import { PAGE_SIZE } from "@/constants/constants";
import { fetchNews } from "@/services/newsService";
import { createStore } from "vuex";

export default createStore({
  state: {
    articles: [],
    bookMarks: [],
    totalResults: 0,
    showFilter: true,
    loading: false,
    query: "all",
    country: "",
    category: "",
    page: 1,
    totalPage: 0,
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    ADD_BOOKMARK(state, bookMark) {
      const isPresent = state.bookMarks.some(
        (item) => item.title === bookMark.title
      );
      if (isPresent) return;
      state.bookMarks = [...state.bookMarks, bookMark];
    },
    REMOVE_BOOKMARK(state, bookMarkId) {
      state.bookMarks = state.bookMarks.filter(
        (bookMark) => bookMark.title !== bookMarkId
      );
    },
    SET_TOTAL_RESULTS(state, totalResults) {
      state.totalResults = totalResults;
    },
    SET_SHOW_FILTER(state, showFilter) {
      state.showFilter = showFilter;
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
      state.bookMarks = [];
      state.loading = true;
      state.page = 1;
      state.totalPage = 0;
      state.query = "";
      state.category = "";
      state.country = "";
    },
  },
  getters: {
    articles: (state) => state.articles,
    bookMarks: (state) => state.bookMarks,
    totalResults: (state) => state.totalResults.toLocaleString(),
    loading: (state) => state.loading,
    query: (state) => (state.query === "all" ? "" : state.query),
    category: (state) => state.category,
    country: (state) => state.country,
    showFilter: (state) => state.showFilter,
    getArticleById: (state) => (id) => {
      return state.articles.find((article) => article.title === id);
    },
    isBookmarked: (state) => (articleTitle) => {
      return state.bookMarks.some(
        (bookMark) => bookMark.title === articleTitle
      );
    },
  },
  actions: {
    async fetchFilteredNews({ commit, state }) {
      commit("SET_LOADING", true);
      try {
        const { articles, totalResults } = await fetchNews(
          "everything",
          state.query,
          state.country,
          state.category,
          1
        );
        commit("SET_ARTICLES", articles);
        commit("SET_TOTAL_RESULTS", totalResults);
        commit("SET_TOTAL_PAGE", Math.ceil(totalResults / PAGE_SIZE));
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async fetchQueryFilteredNews({ commit, state }) {
      commit("SET_LOADING", true);
      try {
        const { articles, totalResults } = await fetchNews(
          "top-headlines",
          state.query,
          state.country,
          state.category,
          1
        );
        commit("SET_ARTICLES", articles);
        commit("SET_TOTAL_RESULTS", totalResults);
        commit("SET_TOTAL_PAGE", Math.ceil(totalResults / PAGE_SIZE));
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async loadMoreArticles({ state, commit }, payload) {
      if (state.loading || state.page >= state.totalPage) return;

      commit("SET_LOADING", true);
      let endpoint;
      if (payload?.endpoint) {
        endpoint = payload.endpoint;
      } else {
        endpoint =
          state.country || state.category ? "top-headlines" : "everything";
      }
      try {
        const { articles: newArticles } = await fetchNews(
          endpoint,
          state.query,
          state.country,
          state.category,
          state.page + 1
        );
        commit("ADD_ARTICLES", newArticles);
        commit("INCREMENT_PAGE");
      } catch (error) {
        console.error("Failed to load more articles:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
});
