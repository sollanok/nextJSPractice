"use client";
import React, { useEffect, useState } from "react";
import MovieList from "@/components/MovieList/MovieList";
import { getFavoriteMovies } from "@/services/accounts/getFavoriteMovies";
import { useGuestSession } from "@/providers/GuestSessionContext";
import Loading from "@/components/Loading/Loading"
import { IMovieDetail } from "@/types/MovieDetail";

const MyFavoritesPage = () => {
  const { guestSessionId } = useGuestSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;
      setLoading(true);
      try {
        const data = await getFavoriteMovies(guestSessionId);
        setMovies(data?.results || []);
       } catch (err) {
        console.error("Error loading favorite movies:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchFavorites();
    }, [guestSessionId]);
    
    return (
      <div className="px-8 mt-20 mb-20">
        <h3 className="text-3xl font-bold mb-6">My Favorite Movies</h3>
        {loading && (
          <Loading />
          )}
          {!loading && movies.length === 0 && (
            <div className="text-center mt-10 text-gray-600">
              <p className="text-xl">You don&apos;t have any favorite movies yet.</p>
              <p className="text-sm mt-2">
                Go to a movie detail page and click Add to Favorites to see it here.
              </p>
            </div>
          )}
        {!loading && movies.length > 0 && <MovieList movies={movies} />}
      </div>
    );
};

export default MyFavoritesPage;
