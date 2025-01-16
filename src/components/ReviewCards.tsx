"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Plus, Star } from "lucide-react";
import { getToken } from "@/services/helper";
import { axiosService } from "@/services/axios";
import { IAdminReviewsTable } from "@/interfaces";
import { ReviewDetailsModal } from "./modal-components/View-Review-Modal";
import { useModal } from "@/context/Modal";

export default function ReviewCards() {
  const { showModal } = useModal();
  const [googleReviews, setGoogleReviews] = useState<IAdminReviewsTable[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Function to fetch Google reviews
  const fetchGoogleReviews = async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.get(`/get-google-map-reviews`, {
        headers: {
          Authorization: getToken() || "",
        },
      });
      setGoogleReviews(response.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const viewReviewModal = (review: IAdminReviewsTable) => {
    showModal(
      <ReviewDetailsModal review={review} />,
      "View Review"
      // (result) => {
      //   if (result) {
      //     // fetchBookings();
      //     // Perform actions or API calls here
      //   }
      // }
    );
  };

  useEffect(() => {
    fetchGoogleReviews();
  }, []); // Dependency array fixed

  const handleAddReview = async (review: IAdminReviewsTable) => {
    try {
      const response = await axiosService.post(`/add-review`, review, {
        headers: {
          Authorization: getToken() || "",
        },
      });
      setGoogleReviews((prevReviews) => [
        ...(prevReviews as IAdminReviewsTable[]),
        { ...review, isSubmitted: true },
      ]);
    } finally {
      console.log();
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-primary font-bold">Google Reviews</h1>
      </div>

      {/* Updated grid layout */}
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-4">
        {googleReviews?.map((review, index) => (
          <Card
            key={index}
            className="flex flex-col w-full dark:bg-background dark:border-background dark:shadow-md"
          >
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={review.authorPic} alt={review.author} />
                  <AvatarFallback>{review.author?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{review.author}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(review.date).toISOString().split("T")[0]}
                  </p>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
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
              <p className={`text-gray-600 ${"text-base"}`}>
                {review.description.slice(0, 200)}...
              </p>
            </CardContent>
            <CardFooter>
              {!review.isSubmitted ? (
                <Button
                  className="w-full bg-primary text-background hover:bg-primary"
                  onClick={() => handleAddReview(review)}
                >
                  Add Review
                </Button>
              ) : (
                <Button
                  className="w-full border dark:border-primary dark:text-primary"
                  variant="outline"
                  disabled
                >
                  Already Added
                </Button>
              )}{" "}
              <Button
                onClick={() => viewReviewModal(review)}
                className="text-2xl mx-2 bg-primary"
              >
                <Eye className="text-white" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
