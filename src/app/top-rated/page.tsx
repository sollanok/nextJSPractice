'use client';

import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loading from "@/components/Loading/Loading";
import Pagination from "@/components/Pagination/Pagination";

const TopRated = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      try {
        const data = await getTopRatedMovies(currentPage);
        setMovies(data?.results);
        setTotalPages(data?.total_pages);
      } catch (err) {
        console.error("Error loading top rated movies:", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="px-8 mt-20 mb-20">
      <h3 className="text-3xl font-bold mb-6">Best Rated Movies</h3>
      {loading && <Loading />}

      <MovieList movies={movies} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default TopRated;