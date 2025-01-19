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

import { IAdminPostsTable } from "@/interfaces";
import { axiosService } from "@/services/axios";
import { getToken } from "@/services/helper";
import { status as PostStatus } from "@/interfaces";
import { useRouter } from "next/navigation";
import InstagramPostsTable from "@/components/InstagramPostsTable";
const Page = () => {
  const navigate = useRouter();
  const [Posts, setPosts] = useState<IAdminPostsTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [status, setStatus] = useState<string>();

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.get(
        `/get-posts${
          status ? `?isActive=${status === PostStatus.active}` : ""
        }`,
        {
          headers: {
            Authorization: getToken() || "",
          },
        }
      );
      setPosts(response.data);
      console.log(Posts);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const onUpdate = async () => {
    fetchPosts();
  };
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center ">
        <h3 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-primary md:text-4xl">
          Instagram Post
        </h3>
        <div className="flex gap-x-4">
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
                {[...Object.values(PostStatus)].map((item, index) => {
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
            onClick={() => navigate.push("/admin/add-embedded-post")}
          >
            Add Post
          </Button>
        </div>
      </div>
      <InstagramPostsTable
        onUpdate={onUpdate}
        instagramPosts={Posts}
        loading={isLoading}
        error={isError}
      />
    </div>
  );
};

export default Page;
