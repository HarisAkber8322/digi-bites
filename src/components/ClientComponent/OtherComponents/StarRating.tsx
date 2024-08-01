// components/StarRating.tsx
import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number; // Rating value from 0 to 5
  onRatingChange: (rating: number) => void; // Callback to handle rating change
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const handleStarClick = (value: number) => {
    onRatingChange(value);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <FaStar
          key={i}
          className="text-yellow-500 cursor-pointer"
          onClick={() => handleStarClick(i)}
        />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          className="text-yellow-500 cursor-pointer"
          onClick={() => handleStarClick(i)}
        />
      );
    } else {
      stars.push(
        <FaRegStar
          key={i}
          className="text-yellow-500 cursor-pointer"
          onClick={() => handleStarClick(i)}
        />
      );
    }
  }
  return <div className="flex">{stars}</div>;
};

export default StarRating;
