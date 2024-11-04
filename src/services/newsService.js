import { PAGE_SIZE } from "@/constants/constants";
import axios from "axios";

const apiKey = process.env.VUE_APP_NEWS_API_KEY;

export const fetchNews = async (
  endpoint,
  query,
  country,
  category,
  page = 1
) => {
  const url = `https://newsapi.org/v2/${endpoint}?q=${query}&pageSize=${PAGE_SIZE}&apikey=${apiKey}&page=${page}${
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
