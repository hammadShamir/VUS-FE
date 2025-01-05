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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { IReviewTable } from "@/interfaces";
import { status as reviewStatus } from "@/interfaces";

const ReviewsTable: React.FC<IReviewTable> = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
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

  const updateReviewStatus = (ReviewId: string, newStatus: string) => {
    // Implement the logic to update the Review status
    console.log(`Updating Review ${ReviewId} to ${newStatus}`);
    props.onUpdate({
      _id: ReviewId,
      isActive: newStatus === reviewStatus.active,
    });
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
                  <TableCell>{Review.description}</TableCell>

                  <TableCell>{Review.rating}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {Review.isActive ? "Active" : "In Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {[...Object.values(reviewStatus)].map((item, index) => {
                          return (
                            <DropdownMenuItem
                              key={index}
                              onClick={() =>
                                updateReviewStatus(Review._id, item)
                              }
                            >
                              <span>{item}</span>
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
