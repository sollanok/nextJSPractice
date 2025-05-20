"use client";

import { useState } from "react";
import Image from "next/image";

const JaegerImagePage = () => {
  const [imageSrc, setImageSrc] = useState("/UnBoopedJaeger.png");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isBooped, setIsBooped] = useState(false);

  const handleImageClick = () => {
    setImageSrc("/BoopedJaeger.png");
    setIsBooped(true);
    setTimeout(() => {
      setIsBooped(false);
      setImageSrc("/UnBoopedJaeger.png");
    }, 500);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        BOOP HIS NOSE!! <br /> <span>(He&apos;s nicer than his brother)</span>
      </h1>
      <Image
        src={imageSrc}
        alt="Jaeger Image"
        width={256}
        height={256}
        className="cursor-pointer transition-transform duration-300 hover:scale-110"
        onClick={handleImageClick}
      />
    </div>
  );
};

export default JaegerImagePage;