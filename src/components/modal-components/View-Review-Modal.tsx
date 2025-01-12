"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { IAdminReviewsTable } from "@/interfaces";

export function ReviewDetailsModal({ review }: { review: IAdminReviewsTable }) {
  return (
    <Card className="flex flex-col w-full border-0">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={review.authorPic} alt={review.author || "A"} />
            <AvatarFallback>{review.author?.charAt(0) || "A"}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">
              {review.author || "Unknown"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {review.date
                ? new Date(review.date).toISOString().split("T")[0]
                : "N/A"}
            </p>
            <div className="flex items-center mt-1">
              {Array.from({ length: review.rating || 0 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 stroke-yellow-400"
                />
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 text-base">
          {review.description || "No description provided."}
        </p>
      </CardContent>
    </Card>
  );
}
