"use client";

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

const images = [
  "/images/Screenshot (2).png",
  "/images/Screenshot (3).png",
  "/images/Screenshot (5).png",
  "/images/Screenshot(4).png",
  "/images/Screenshot (2).png",
  "/images/Screenshot (3).png"
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
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleClick = (index: number) => {
    console.log(`Image ${index + 1} clicked!`);
    // Add your custom click handler logic here
  };

  return (
    <div className="relative rounded-xl z-50 w-full m-auto h-[287px]">
      <div className="absolute rounded-xl z-40 bg-black bg-opacity-25 w-full h-full"></div>
      <div className="overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            onClick={() => handleClick(index)}
            className={classNames(
              "cursor-pointer rounded-xl absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
              { "opacity-0": index !== currentIndex, "opacity-100": index === currentIndex }
            )}
          />
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-50"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-50"
      >
        &#10095;
      </button>
    </div>
  );
};

export default observer(Slider);

