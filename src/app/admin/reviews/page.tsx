"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { IAdminReviewsTable } from "@/interfaces";
import { axiosService } from "@/services/axios";
import { getToken } from "@/services/helper";
import { status as reviewStatus } from "@/interfaces";
import ReviewsTable from "@/components/ReviewTable";
import { useRouter } from "next/navigation";
const Page = () => {
  const navigate = useRouter();
  const [reviews, setreviews] = useState<IAdminReviewsTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [status, setStatus] = useState<string>();
  const fetchreviews = async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.get(
        `/get-reviews${
          status ? `?isActive=${status === reviewStatus.active}` : ""
        }`,
        {
          headers: {
            Authorization: getToken() || "",
          },
        }
      );
      setreviews(response.data);
      console.log(reviews);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchreviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const onUpdate = async () => {
    fetchreviews();
  };
  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center ">
        <h3 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-primary md:text-4xl">
          Reviews
        </h3>
        <div className="flex lg:block space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Status
                <ChevronDown className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setStatus("")}>
                  All
                </DropdownMenuItem>
                {[...Object.values(reviewStatus)].map((item, index) => {
                  return (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => setStatus(item)}
                    >
                      <span>{item}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="default"
            className="bg-primary text-background"
            onClick={() => navigate.push("/admin/add-review")}
          >
            Add Review
          </Button>
        </div>
      </div>
      <ReviewsTable
        reviews={reviews}
        onUpdate={onUpdate}
        loading={isLoading}
        error={isError}
      />
    </div>
  );
};

export default Page;
