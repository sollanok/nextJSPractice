import api from "../api";

export const getTrendingMovies = async (page = 1) => {
  try {
    const endpoint = `/trending/movie/week?page=${page}`;
    const response = await api.get(endpoint);
    return response.data;
  } catch (err) {
    console.error("Error fetching trending movies:", err);
    return err;
  }
};