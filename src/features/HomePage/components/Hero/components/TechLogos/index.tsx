"use client";

import { mobileOnly } from "@/styles/responsive-classes";
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
  const firstRow = logos.slice(0, 4);
  const secondRow = logos.slice(4);

  return (
    <div className={
      `mt-8
      sm:mt-16
      max-w-screen-lg
      mx-auto
      px-4
      opacity-60
      dark:opacity-40
      transition-opacity
      duration-300
      ${mobileOnly.padding.pt8}
      `
    }>
      {/* Layout Mobile */}
      <div className="block sm:hidden">
        <div className="flex flex-col gap-8">
          {/* Primeira linha - 4 logos */}
          <div className="grid grid-cols-4 gap-6">
            {firstRow.map((logo) => (
              <div
                key={logo.alt}
                className="
                  flex
                  items-center
                  justify-center
                  w-full
                  h-[35px]
                  relative
                "
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={45}
                  height={35}
                  className={`
                    dark:invert
                    transition-transform
                    duration-300
                    hover:scale-110
                    ${logo.scale}
                    object-contain
                    max-h-[65px]
                  `}
                />
              </div>
            ))}
          </div>

          {/* Segunda linha - 3 logos */}
          <div className="grid grid-cols-3 gap-6 w-[75%] mx-auto">
            {secondRow.map((logo) => (
              <div
                key={logo.alt}
                className="
                  flex
                  items-center
                  justify-center
                  w-full
                  h-[35px]
                  relative
                "
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={45}
                  height={35}
                  className={`
                    dark:invert
                    transition-transform
                    duration-300
                    hover:scale-110
                    ${logo.scale}
                    object-contain
                    max-h-[65px]
                  `}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layout Tablet/Desktop */}
      <div className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-7 sm:gap-8">
        {logos.map((logo) => (
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
              width={45}
              height={35}
              className={`
                dark:invert
                transition-transform
                duration-300
                hover:scale-110
                ${logo.scale}
                object-contain
                max-h-[80px]
              `}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
