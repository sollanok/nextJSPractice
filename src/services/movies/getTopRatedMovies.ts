import api from "../api";

export const getTopRatedMovies = async () => {
  let res: any;
  const endpoint = "/movie/top_rated";
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