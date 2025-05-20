import api from "../api";

export const getNowPlayingMovies = async (page = 1) => {
  try {
    const endpoint = `/movie/now_playing?page=${page}`;
    const response = await api.get(endpoint);
    return response.data;
  } catch (err) {
    console.error("Error fetching now playing movies:", err);
    return err;
  }
};