'use client';

import Config from "@/config";
import Image from "next/image";
import { motion } from "framer-motion";

interface IMovieCard {
    title: string;
    voteAverage: number;
    posterPath: string;
    releaseYear: number;
    description: string;
}

const MovieCard: React.FC<IMovieCard> = ({
    title,
    voteAverage,
    posterPath,
    releaseYear,
    description,
}) => {
    const poster = Config.IMAGE_SOURCE + posterPath;

    return (
        <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.div 
                className="mx-auto bg-white/35 rounded-3xl shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <div className="grid rounded-3xl max-w-[360px] shadow-sm bg-slate-100/40 flex-col group">
                    {/* Poster Image */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src={poster}
                            width="360"
                            height="200"
                            className="rounded-t-3xl justify-center grid object-cover"
                            alt={title}
                        />
                    </motion.div>

                    <div className="p-5 z-10">
                        {/* Movie Title */}
                        <p className="h-10 text-[20px] font-extrabold">{title}</p>
                        <p className="text-amber-50 pt-2 font-semibold">{releaseYear}</p>

                        {/* Movie Description */}
                        <div className="h-20">
                            <span className="line-clamp-3 py-2 h-20 text-sm font-light leading-relaxed">
                                {description}
                            </span>
                        </div>

                        {/* Movie Rating */}
                            <div className="font-black flex flex-col">
                                <span className="text-yellow-500 text-xl">SCORE</span>
                                <span className="text-3xl flex gap-x-1 items-center group-hover:text-yellow-600 transition-colors">
                                    {voteAverage.toFixed(1)}
                                </span>
                            </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MovieCard;