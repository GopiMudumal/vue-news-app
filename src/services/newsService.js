import axios from "axios";

const apiKey = process.env.VUE_APP_NEWS_API_KEY;

export const fetchNews = async (query, country, category, page = 1) => {
  console.log({ query, country, category, page });
  const url = `https://newsapi.org/v2/top-headlines?q=${query}&pageSize=10&apikey=${apiKey}&page=${page}${
    country ? `&country=${country}` : ""
  }${category ? `&category=${category}` : ""}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
