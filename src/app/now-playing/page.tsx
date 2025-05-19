'use client';

import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loading from "@/components/Loading/Loading";

const NowPlaying = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true);
      //await new Promise((resolve) => setTimeout(resolve, 2000));
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
    <div className="px-8 mt-20 mb-20">
      <h3 className="text-3xl text-amber-50 font-bold mb-6">Películas en Cartelera</h3>
      {loading && <Loading />}
      
      <MovieList movies={movies} />
    </div>
  );
};

export default NowPlaying;
