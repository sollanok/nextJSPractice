import api from "../api";

export const getUpcomingMovies = async (page = 1) => {
  try {
    const endpoint = `/movie/upcoming?page=${page}`;
    const response = await api.get(endpoint);
    return response.data;
  } catch (err) {
    console.error("Error fetching upcoming movies:", err);
    return err;
  }
};