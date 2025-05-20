import api from "../api";

export const getTopRatedMovies = async (page = 1) => {
  try {
    const endpoint = `/movie/top_rated?page=${page}`;
    const response = await api.get(endpoint);
    return response.data;
  } catch (err) {
    console.error("Error fetching top-rated movies:", err);
    return err;
  }
};