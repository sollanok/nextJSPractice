"use client";

import { useState } from "react";
import Image from "next/image";

const CrashImagePage = () => {
  const [imageSrc, setImageSrc] = useState("/NormalCrash.png");
  const [clickCount, setClickCount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMad, setIsMad] = useState(false);

  const handleImageClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickCount + 1 >= 3) {
      setImageSrc("/KillerCrash.png");

      setTimeout(() => {
        setImageSrc("/NormalCrash.png");
        setClickCount(0);
      }, 2000);
    } else {
      setImageSrc("/MadCrash.png");
      setIsMad(true);
      setTimeout(() => {
        setIsMad(false);
        setImageSrc("/NormalCrash.png");
      }, 500);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Click!</h1>
      <Image
        src={imageSrc}
        alt="Crash Image"
        width={256}
        height={256}
        className="cursor-pointer transition-transform duration-300 hover:scale-110"
        onClick={handleImageClick}
      />
    </div>
  );
};

export default CrashImagePage;