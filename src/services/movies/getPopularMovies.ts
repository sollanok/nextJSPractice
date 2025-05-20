import api from "../api";

export const getPopularMovies = async (page = 1) => {
  try {
    const endpoint = `/movie/popular?page=${page}`;
    const response = await api.get(endpoint);
    return response.data;
  } catch (err) {
    console.error("Error fetching popular movies:", err);
    return err.response;
  }
};