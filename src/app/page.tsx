"use client";

import { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { getUpcomingMovies } from "@/services/movies/getUpcomingMovies";
import { getTrendingMovies } from "@/services/movies/getTrendingMovies";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import MovieCard from "@/components/MovieCard/MovieCard";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function Home() {
  const [backgrounds, setBackgrounds] = useState([]);
  const [titles, setTitles] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularData = await getPopularMovies();
        if (!popularData?.results || popularData.results.length === 0) return;

        const backdrops = popularData.results.map((movie) => `${IMAGE_BASE_URL}${movie.backdrop_path}`);
        const movieTitles = popularData.results.map((movie) => movie.title);
        setBackgrounds(backdrops);
        setTitles(movieTitles);

        const trendingData = await getTrendingMovies();
        setTrendingMovies(trendingData?.results || []);

        const upcomingData = await getUpcomingMovies();
        setUpcomingMovies(upcomingData?.results || []);

        let index = 0;
        const interval = setInterval(() => {
          setFade(true);
          setTimeout(() => {
            index = (index + 1) % backdrops.length;
            setActiveIndex(index);
            setFade(false);
          }, 1000);
        }, 5000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-y-auto">
      <div className="relative h-screen">
        {backgrounds.map((backdrop, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${backdrop})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center top",
              opacity: index === activeIndex ? 1 : 0,
            }}
          />
        ))}

        <motion.div
          key={titles[activeIndex]}
          className="absolute bottom-4 right-4 text-white text-[50px] bg-black/20 px-4 py-2 rounded"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          {titles[activeIndex]}
        </motion.div>
      </div>

      <div className="relative px-8 py-12 bg-[#cdc5ed]">

        <h2 className="text-3xl font-bold text-white mb-4">Trending Movies</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {trendingMovies.map((movie) => (
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
      <h2 className="text-3xl font-bold text-white mt-5 mb-4">Upcoming Movies</h2>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {upcomingMovies.map((movie) => (
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
    </div>
  );
}