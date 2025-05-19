"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getMovieById } from "@/services/movies/getMovieById";
import api from "@/services/api"; 
import { motion } from "framer-motion";
import Loading from "@/components/Loading/Loading";

const MovieDetailPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const [movie, setMovie] = useState<any>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getMovieById(id);
        setMovie(data);

        const { data: trailerData } = await api.get(`/movie/${id}/videos`);

        if (trailerData?.results?.length > 0) {
          const trailer = trailerData.results.find(video => video.type === "Trailer");
          setTrailerKey(trailer ? trailer.key : null);
        } else {
          setTrailerKey(null);
        }
      } catch (err) {
        console.error("Error fetching movie or trailer:", err);
        setError("Could not load movie or trailer. Please try again.");
      }

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!movie) {
    return <div className="flex items-center justify-center h-screen text-gray-700">No movie found.</div>;
  }

  return (
    <motion.div 
      className="relative min-h-screen flex flex-col items-center p-6 text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ backgroundImage: `url(${movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : "/fallback.jpg"})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl p-6 mt-40">
        
        <div className="flex flex-col items-center text-center p-4 w-full md:w-1/2 bg-black/70 rounded-lg">
          <motion.h1
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {movie.title}
          </motion.h1>
          <p className="text-lg">{movie.release_date.split("-")[0]}</p>
          <p className="text-gray-300 mt-2">{movie.overview}</p>
          <div className="mt-4 flex items-center justify-center">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>

        {trailerKey && (
          <div className="w-full md:w-1/2 flex justify-center">
            <iframe
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MovieDetailPage;