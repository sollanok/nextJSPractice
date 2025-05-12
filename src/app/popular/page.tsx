'use client';

import { getPopularMovies } from "@/services/movies/getPopularMovies";
import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

const PopularClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación de retraso de carga
      try {
        const data = await getPopularMovies();
        setMovies(data?.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, []);
  
  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Películas Populares</h3>
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
      
      <MovieList movies={movies} />
    </div>
  );
};

export default PopularClientPage;