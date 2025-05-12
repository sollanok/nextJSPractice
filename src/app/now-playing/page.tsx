'use client';

import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

const NowPlaying = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación de retraso
      try {
        const data = await getNowPlayingMovies();
        setMovies(data?.results);
      } catch (err) {
        console.error("Error loading now playing movies:", err);
      }
      setLoading(false);
    };

    fetchNowPlayingMovies();
  }, []);
  
  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Películas en Cartelera</h3>
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
      
      <MovieList movies={movies} />
    </div>
  );
};

export default NowPlaying;
