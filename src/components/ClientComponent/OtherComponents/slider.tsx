"use client";

import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import Image from "next/image";
import Text from "../../UI/Text";
const images = [
  "/images/s1.jpg",
  "/images/s2.png",
  "/images/s3.png",
  "/images/s4.png",
  "/images/s2.png",
  "/images/s3.png",
];

interface SliderProps {
  interval?: number;
}

const Slider: React.FC<SliderProps> = ({ interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleClick = (index: number) => {
    console.log(`Image ${index + 1} clicked!`);
    // Add your custom click handler logic here
  };

  return (
    <div className="relative rounded-xl z-0 w-full m-auto h-[287px]  ">
      <div className="absolute rounded-xl z-20 w-full h-full bg-black opacity-5"></div>
      <div className="overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={classNames(
              "cursor-pointer absolute rounded-xl z-10 transition-opacity duration-1000 bg-cover bg-center",
              {
                "opacity-0": index !== currentIndex,
                "opacity-100": index === currentIndex,
              },
            )}
            style={{
              backgroundImage: `url(${image})`,
              width: "1180px",
              height: "300px",
            }}
            role="img"
            aria-label={`Slide ${index}`}
          />
        ))}
      </div>

      <Text
        lightColor="text-white"
        darkColor="text-white"
        themeDivClasses=""
        content={
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50  p-2 rounded-full z-50"
            >
              &#10094;
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50  p-2 rounded-full z-50"
            >
              &#10095;
            </button>
          </>
        }
      />
    </div>
  );
};

export default observer(Slider);
