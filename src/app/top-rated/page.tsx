'use client';

import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loading from "@/components/Loading/Loading";

const TopRated = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      //await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación de retraso
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
    <div className="px-8 mt-20 mb-20">
      <h3 className="text-3xl text-amber-50 font-bold mb-6">Películas Mejor Calificadas</h3>
      {loading && <Loading />}
      
      <MovieList movies={movies} />
    </div>
  );
};

export default TopRated;
