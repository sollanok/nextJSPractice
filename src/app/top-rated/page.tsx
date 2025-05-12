'use client';

import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

const TopRated = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación de retraso
      try {
        const data = await getTopRatedMovies();
        setMovies(data?.results);
      } catch (err) {
        console.error("Error loading top rated movies:", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, []);
  
  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Películas Mejor Calificadas</h3>
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
      
      <MovieList movies={movies} />
    </div>
  );
};

export default TopRated;
