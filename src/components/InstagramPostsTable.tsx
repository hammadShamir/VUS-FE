"use client";

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
import { BookingStatus, IAdminPostsTable, IPostsTable } from "@/interfaces";
import { useState } from "react";

import { ViewPostModal } from "./modal-components/View-Post-Modal";
import { useModal } from "@/context/Modal";
import BookingStatusBadge from "./Booking-Status";
import Image from "next/image";

const InstagramPostsTable: React.FC<IPostsTable> = ({
  instagramPosts,
  error,
  loading,
  onUpdate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { showModal } = useModal();
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
  const totalPages = Math.ceil(instagramPosts.length / itemsPerPage);

  const ViewPostInstagramModal = (post: IAdminPostsTable) => {
    showModal(<ViewPostModal post={post} />, "View Post", (result) => {
      if (result) {
        onUpdate();
        // Perform actions or API calls here
      }
    });
  };

  return (
    <div className="space-y-4 my-4">
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S No</TableHead>
              <TableHead>Post Picture</TableHead>
              <TableHead>Caption</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error ? (
              <span>Error</span>
            ) : loading ? (
              <span>Loading...</span>
            ) : !instagramPosts.length ? (
              <TableRow>
                <TableCell className="font-medium" colSpan={12}>
                  <h3 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-primary md:text-4xl text-center w-full">
                    No post Available
                  </h3>
                </TableCell>
              </TableRow>
            ) : (
              instagramPosts.map((post, i) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>
                    <Image
                      src={post.imgUrl}
                      height={50}
                      width={50}
                      alt="insta post"
                    />
                  </TableCell>
                  <TableCell>{post.caption}</TableCell>

                  <TableCell>
                    {post.isActive ? (
                      <BookingStatusBadge status={BookingStatus.active} />
                    ) : (
                      <BookingStatusBadge status={BookingStatus.inactive} />
                    )}
                  </TableCell>
                  <TableCell className="items-center flex">
                    <Eye onClick={() => ViewPostInstagramModal(post)} />
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

export default InstagramPostsTable;
