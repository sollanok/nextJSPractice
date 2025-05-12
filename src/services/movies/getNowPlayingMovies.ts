import api from "../api";

export const getNowPlayingMovies = async () => {
  let res: any;
  const endpoint = "/movie/now_playing";
  await api
    .get(endpoint)
    .then((d) => {
      res = d.data;
    })
    .catch((err) => {
      res = err.response;
    });
  return res;
};