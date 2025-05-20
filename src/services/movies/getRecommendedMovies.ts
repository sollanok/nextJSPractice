import api from "../api";

export const getMovieRecommendations = async (movieId, page = 1) => {
  try {
    const endpoint = `/movie/${movieId}/recommendations?page=${page}`;
    const response = await api.get(endpoint);
    return response.data;
  } catch (err) {
    console.error(`Error fetching recommendations for movie ${movieId}:`, err);
    return err.response;
  }
};