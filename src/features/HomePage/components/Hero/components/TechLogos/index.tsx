"use client";

import Image from "next/image";
import React from "react";

const logos = [
  { src: "/images/techs/Typescript.svg", alt: "Typescript", scale: "scale-100" },
  { src: "/images/techs/Ethereum.svg", alt: "Ethereum", scale: "scale-100" },
  { src: "/images/techs/Besu.svg", alt: "Besu", scale: "scale-[1.6]" },
  { src: "/images/techs/Next.svg", alt: "Next.js", scale: "scale-100" },
  { src: "/images/techs/Solidity.svg", alt: "Solidity", scale: "scale-[1.2]" },
  { src: "/images/techs/NestJS.svg", alt: "NestJS", scale: "scale-[1.3]" },
  { src: "/images/techs/Go.svg", alt: "Go", scale: "scale-[1.7]" },
];

export function TechLogos() {
  return (
    <div className="
      mt-16
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-7
      gap-8
      items-center
      justify-center
      opacity-60
      dark:opacity-40
      transition-opacity
      duration-300
    ">
      {logos.map((logo, index) => (
        <div
          key={logo.alt}
          className="
            flex
            items-center
            justify-center
            w-full
            h-[40px]
            relative
          "
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={60}
            height={40}
            className={`
              dark:invert
              transition-transform
              duration-300
              ${logo.scale}
              object-contain
              max-h-[80px]
            `}
          />
        </div>
      ))}
    </div>
  );
}
