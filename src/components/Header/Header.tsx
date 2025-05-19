'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
    { href: '/popular', label: 'Popular' },
    { href: '/now-playing', label: 'Now Playing' },
    { href: '/top-rated', label: 'Top Rated' },
    { href: '/my-favorites', label: 'My Favorites' },
];

const Header = () => {
    const pathname = usePathname();
    const [selected, setSelected] = useState(pathname);
    const [logoSrc, setLogoSrc] = useState(pathname === "/" ? "/CrashClicked.png" : "/Crash.png");

    useEffect(() => {
        setLogoSrc(pathname === "/" ? "/CrashClicked.png" : "/Crash.png");
    }, [pathname]);

    return (
        <header className="fixed top-0 left-0 w-full h-18 backdrop-blur-md bg-white/60 shadow-md z-50">
            <div className="container mx-auto flex items-center justify-center px-4 py-3">
                <Link href="/" className="absolute left-20">
                    <div className="relative w-[50px] h-[30px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={logoSrc}
                                initial={{ opacity: 0, position: "absolute" }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Image 
                                    src={logoSrc} 
                                    alt="Crash Logo"
                                    width={50} 
                                    height={30} 
                                    className="object-contain"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </Link>
                <nav className="relative flex items-center gap-12">
                    {links.map(({ href, label }) => (
                        <Link 
                            key={href} 
                            href={href} 
                            onClick={() => setSelected(href)}
                            className={clsx(
                                "relative flex justify-items-center text-xl text-black hover:text-[#8d7ad6] transition-colors font-bold"
                            )}
                        >
                            {label}
                            {selected === href && pathname !== "/" && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute left-0 bottom-0 h-[3px] bg-[#8d7ad6] w-full"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
