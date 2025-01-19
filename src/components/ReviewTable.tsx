"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { IAdminReviewsTable, IReviewTable } from "@/interfaces";
import { ReviewDetailsModal } from "./modal-components/View-Review-Modal";
import { useModal } from "@/context/Modal";
import BookingStatusBadge from "./Booking-Status";

const ReviewsTable: React.FC<IReviewTable> = (props) => {
  const { showModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //   const statusStyles: Record<string, string> = {
  //     [ReviewStatus.pending]:
  //       "text-yellow-500 bg-yellow-100 dark:border-yellow-100",
  //     [ReviewStatus.approved]:
  //       "text-green-500 bg-green-100 dark:border-green-100",
  //     [ReviewStatus.rejected]: "text-red-500 bg-red-100 dark:border-red-100",
  //     [ReviewStatus.complete]: "text-blue-500 bg-blue-100 dark:border-blue-100",
  //     [ReviewStatus.cancelled]: "text-gray-500 bg-gray-100 dark:border-gray-100",
  //   };
  const totalPages = Math.ceil(props.reviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = props.reviews.slice(startIndex, endIndex);

  const viewReviewModal = (review: IAdminReviewsTable) => {
    showModal(
      <ReviewDetailsModal review={review} />,
      "View Review",
      (result) => {
        if (result) {
          props.onUpdate();
        }
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S No</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.error ? (
              <span>Error</span>
            ) : props.loading ? (
              <span>Loading...</span>
            ) : !currentReviews.length ? (
              <TableRow>
                <TableCell className="font-medium" colSpan={12}>
                  <h3 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-primary md:text-4xl text-center w-full">
                    No Review Available
                  </h3>
                </TableCell>
              </TableRow>
            ) : (
              currentReviews.map((Review, i) => (
                <TableRow key={Review._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>{Review.author}</TableCell>
                  <TableCell>
                    {Review.description.split(" ").slice(0, 20).join(" ")}
                    {Review.description.split(" ").length > 20 ? "..." : ""}
                  </TableCell>

                  <TableCell>{Review.rating}</TableCell>

                  <TableCell>
                    {Review.isActive ? (
                      <BookingStatusBadge status={"Active"} />
                    ) : (
                      <BookingStatusBadge status={"Inactive"} />
                    )}
                  </TableCell>
                  <TableCell className="text-right flex justify-center items-center">
                    <div>
                      <Eye onClick={() => viewReviewModal(Review)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ReviewsTable;
