import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

type RatingProps = {
  rating: number;
  maxRating?: number;
};

export default function Rating({ rating, maxRating = 5 }: RatingProps) {
  return (
    <div className="flex items-center space-x-1 text-[#D4AF37]">
      {Array.from({ length: maxRating }, (_, index) => {
        const isHalf = rating - index >= 0.5 && rating - index < 1;
        const isFull = rating - index >= 1;
        return (
          <span key={index}>
            {isFull ? (
              <BsStarFill className="h-5 w-5" />
            ) : isHalf ? (
              <BsStarHalf className="h-5 w-5 " />
            ) : (
              <BsStar className="h-5 w-5" />
            )}
          </span>
        );
      })}
    </div>
  );
}
