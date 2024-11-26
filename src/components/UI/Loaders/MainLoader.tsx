import { useEffect, useState } from "react";
import React from "react";
import { Image } from "react-bootstrap";
const Loader = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/images/loader_image_1.png",
    "/images/loader_image_2.png",
    "/images/loader_image_3.png",
    "/images/loader_image_4.png",
    "/images/loader_image_5.png",
  ];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 300); // Change image every 300ms

    return () => clearInterval(imageInterval);
  }, [images.length]);

  return (
    <>
      {/* FIRST LOADER */}
      <div className="flex flex-col items-center justify-center h-[100vh]  bg-gray-100">
        <div className="flex items-center justify-center mb-6">
          <Image
            src={images[currentImageIndex]}
            alt=""
            className="w-24 h-24 object-contain"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-100">
          <h2 className="mb-4 text-xl font-semibold">Loading...</h2>
          <div className="relative w-64 h-4 bg-gray-300 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-blue-500 animate-slide"></div>
          </div>
        </div>
      </div>
      {/* SECOND LOADER
      <div className="flex flex-col items-center justify-center  bg-gray-100">
        <div className="w-20 h-20 border-8 border-solid border-t-blue-500 border-r-green-500 border-b-red-500 border-l-pink-500 rounded-full animate-spin"></div>
      </div>

       Third LOADER 
      <div className="flex mt-5 flex-col items-center justify-center  bg-gray-100">
        <div className="w-10 h-10 border-4 border-solid border-t-black-500 border-r-gray border-b-gray border-l-gray rounded-full animate-spin"></div>
      </div>
      FORTH LOADER 
      <div className="flex items-center mt-7 justify-center bg-gray-100">
        <div className="loader"></div>
      </div>
       FIFTH LOADER 
      <div className="flex items-center mt-7 justify-center bg-gray-100">
        <div className="PizzaLoader"></div>
      </div> */}
    </>
  );
};

export default Loader;
