"use client";

import Image from "next/image";
import React from "react";
import { techLogosStyles } from "./styles";

const logos = [
  { src: "/logos/Typescript.svg", alt: "Typescript" },
  { src: "/logos/Ethereum.svg", alt: "Ethereum" },
  { src: "/logos/Besu.svg", alt: "Besu" },
  { src: "/logos/Next.svg", alt: "Next.js" },
  { src: "/logos/Solidity.svg", alt: "Solidity" },
  { src: "/logos/NestJS.svg", alt: "NestJS" },
  { src: "/logos/Go.svg", alt: "Go" },
];

const customScale: { [key: string]: string } = {
  Besu: "scale-[1.6]",
  Go: "scale-[1.7]",
};

export function TechLogos() {
  return (
    <React.Fragment>
      <div className={techLogosStyles.container}>
        <p className={techLogosStyles.title}>
          POWERING WITH TECHNOLOGIES
        </p>
      </div>

      <div className={techLogosStyles.logosWrapper}>
        {logos.map((logo, idx) => {
          const scaleClass = customScale[logo.alt] || "scale-100";
          return (
            <div key={idx} className={techLogosStyles.logoItem}>
              <div className={`${techLogosStyles.logoImage} ${scaleClass}`}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
