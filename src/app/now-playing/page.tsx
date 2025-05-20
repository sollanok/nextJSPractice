'use client'

import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loading from "@/components/Loading/Loading";
import Pagination from "@/components/Pagination/Pagination";
import { IMovieDetail } from "@/types/MovieDetail";

const NowPlaying = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true);

      try {
        const data = await getNowPlayingMovies(currentPage);
        setMovies(data?.results);
        setTotalPages(data?.total_pages);
      } catch (err) {
        console.error("Error loading now playing movies:", err);
      }

      setLoading(false);
    };

    fetchNowPlayingMovies();
  }, [currentPage]);

  return (
    <div className="px-8 mt-20 mb-20">
      <h3 className="text-3xl font-bold mb-6">Now in Cinemas</h3>
      {loading && <Loading />}

      <MovieList movies={movies} />
      
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default NowPlaying;