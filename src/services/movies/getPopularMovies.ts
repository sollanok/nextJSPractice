import api from "../api";

export const getPopularMovies = async () => {
  let res: any;
  const endpoint = "/movie/popular";
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