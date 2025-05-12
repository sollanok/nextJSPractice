"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getMovieById } from "@/services/movies/getMovieById";

const MovieDetailPage = () => {
    const { id } = useParams(); // id is a string | string[] | undefined
    const searchParams = useSearchParams();
    const from = searchParams.get("from");
    console.log(from);
    const [movie, setMovie] = useState<any>(); // pendiente de type
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!id || typeof id !== "string") return;
        
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const data = await getMovieById(id);
                setMovie(data);
            } catch (err) {
                console.error("Error fetching movie", err);
                setError("Could not load movie.");
            } finally {
                setLoading(false);
            }
        };  
        fetchMovie();
    }, [id]);
    if (loading) return <div>Loading movie...</div>;
    if (error) return <div>{error}</div>;
    if (!movie) return <div>No movie found.</div>;
    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
            <p className="text-gray-700">{movie.overview}</p>
            {/* Add more movie details here */}
        </div>
    );
};

export default MovieDetailPage;