"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getMovieById } from "@/services/movies/getMovieById";
import api from "@/services/api"; 
import { motion } from "framer-motion";
import Loading from "@/components/Loading/Loading";
import { markAsFavorite } from "@/services/accounts/markAsFavorite";
import { useGuestSession } from "@/providers/GuestSessionContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";
import { getMovieRecommendations } from "@/services/movies/getRecommendedMovies";
import { IMovieDetail } from "@/types/MovieDetail";

const MovieDetailPage = () => {
  const { id } = useParams();

  const [isFavorite, setIsFavorite] = useState(false);
  const { guestSessionId } = useGuestSession();

  const [recommendedMovies, setRecommendedMovies] = useState<Array<IMovieDetail> | null>(null);

  const [movie, setMovie] = useState<IMovieDetail | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const movieData = await getMovieById(id);
        setMovie(movieData);
        
        const { data: trailerData } = await api.get(`/movie/${id}/videos`);
        if (trailerData?.results?.length > 0) {
          const trailer = trailerData.results.find((video: { type: string; }) => video.type === "Trailer");
          setTrailerKey(trailer ? trailer.key : null);
         } else {
          setTrailerKey(null);
         }
         
         const recommendationsData = await getMovieRecommendations(id);
         setRecommendedMovies(recommendationsData?.results || []);
      } catch (err) {
        console.error("Error fetching movie, trailer, or recommendations:", err);
        setError("Could not load data. Please try again.");
      }
      
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const storedFavorites = localStorage.getItem("favoriteMovieIds");
    const favoriteIds: number[] = storedFavorites
    ? JSON.parse(storedFavorites)
    : [];
    setIsFavorite(favoriteIds.includes(Number(id)));
  }, [id]);
  
  const handleToggleFavorite = async () => {
    if (!guestSessionId || !movie) return;
    const newFavoriteState = !isFavorite;
    try {
      await markAsFavorite(movie.id, newFavoriteState, guestSessionId);
      setIsFavorite(newFavoriteState);
      const storedFavorites = localStorage.getItem("favoriteMovieIds");
      const favoriteIds: number[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];
      const updatedFavorites = newFavoriteState
      ? [...new Set([...favoriteIds, movie.id])]
      : favoriteIds.filter((id) => id !== movie.id);
      localStorage.setItem(
        "favoriteMovieIds",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
};

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
  className="relative min-h-screen flex flex-col items-center text-white"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <div 
    className="relative w-full min-h-screen flex flex-col items-center justify-center p-6"
    style={{ 
      backgroundImage: `url(${movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : "/fallback.jpg"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
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
          <p className="text-lg">{new Date(movie.release_date).toISOString().split("T")[0]}</p>
          <p className="text-gray-300 mt-2">{movie.overview}</p>
          <div className="mt-4 flex items-center justify-between w-full">
          <motion.button
          onClick={handleToggleFavorite}
          className="text-3xl flex items-center justify-center"
          whileTap={{ scale: 0.8 }}
          >
          <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: isFavorite ? 1.2 : 1, opacity: isFavorite ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          >
            {isFavorite ? (
              <AiFillHeart className="text-red-500" />
            ) : (
            <AiOutlineHeart className="text-red-500" />
            )}
          </motion.div>
        </motion.button>
        
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
      </div>
      <div className="relative px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-4">If you liked this</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {recommendedMovies?.map((movie) => (
            <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Link 
                key={movie.id}
                href={{
                  pathname: `/movie/${movie.id}`,
                  query: { from: "popular" },
                }}
                >
                  <MovieCard
                  title={movie.title}
                  voteAverage={movie.vote_average}
                  posterPath={movie.poster_path}
                  releaseYear={new Date(movie.release_date).getFullYear()}
                  description={movie.overview}
                  />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    </motion.div>
  );
};

export default MovieDetailPage;