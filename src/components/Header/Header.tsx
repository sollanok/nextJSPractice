'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const links = [
    { href: '/clickable-crash', label: 'Click on Crash' },
    { href: '/boopeable-jaeger', label: 'Boop Jaeger' },
    { href: '/popular', label: 'Popular' },
    { href: '/now-playing', label: 'Now Playing' },
    { href: '/top-rated', label: 'Top Rated' },
    { href: '/my-favorites', label: 'My Favorites' },
];

const Header = () => {
    const pathname = usePathname();
    const [selected, setSelected] = useState(pathname);
    const [isRotating, setIsRotating] = useState(false);

    return (
        <header 
    className={clsx(
        "fixed top-0 left-0 w-full h-18 flex items-center justify-center backdrop-blur-md shadow-md z-50 transition-colors duration-300",
        pathname === "/" ? "bg-[#8c78da]/70" : "bg-[#8c78da]/30"
    )}
>
    <div className="container mx-auto flex items-center justify-between px-4 py-3">
        
        <Link href="/" className="flex items-center">
            <motion.div
                className="relative w-[50px] h-[50px]"
                onClick={() => setIsRotating(!isRotating)}
                animate={{ rotate: isRotating ? 360 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <Image 
                    src="/RotatingJaeger.png" 
                    alt="Jaeger Logo"
                    width={50} 
                    height={50} 
                    className="object-contain"
                />
            </motion.div>
        </Link>

        <nav className="flex items-center gap-12">
            {links.map(({ href, label }) => (
                <Link 
                    key={href} 
                    href={href} 
                    onClick={() => setSelected(href)}
                    className={clsx(
                        "relative flex items-center text-xl text-black transition-colors font-bold"
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
