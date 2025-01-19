"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { IAdminReviewsTable } from "@/interfaces";
import { axiosService } from "@/services/axios";
import { getToken } from "@/services/helper";
import { useModal } from "@/context/Modal";

export function ReviewDetailsModal({ review }: { review: IAdminReviewsTable }) {
  const { hideModal } = useModal();
  const handleUpdateReview = async (payload: Partial<IAdminReviewsTable>) => {
    await axiosService.put(`/update-review/${review._id}`, payload, {
      headers: {
        Authorization: getToken() || "",
      },
    });
    hideModal(true);
  };
  return (
    <Card className="flex border-0 bg-background shadow-none flex-col w-full dark:bg-background text-foreground">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={review.authorPic} alt={review.author || "A"} />
            <AvatarFallback>{review.author?.charAt(0) || "A"}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-foreground">
              {review.author || "Unknown"}
            </h3>
            <p className="text-sm text-foreground text-muted-foreground">
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
      {review.isActive ? (
        <div className="col-span-2 flex justify-end self-end">
          <Button
            onClick={() => {
              handleUpdateReview({ isActive: false });
            }}
            className="bg-red-600 text-background"
            variant={"outline"}
          >
            In Active
          </Button>
        </div>
      ) : (
        <div className="col-span-2 flex justify-end self-end">
          <Button
            onClick={() => {
              handleUpdateReview({ isActive: true });
            }}
            className="bg-green-600 text-background mr-2"
            variant={"outline"}
          >
            Active
          </Button>
        </div>
      )}
    </Card>
  );
}
