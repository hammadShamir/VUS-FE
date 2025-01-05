"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import { axiosService } from "@/services/axios";
import { getToken } from "@/services/helper";
import { IAdminPostsTable } from "@/interfaces";

export default function InstagramCard() {
  const [posts, setPosts] = useState<IAdminPostsTable[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchPostReviews = async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.get(`/get-instagram-posts`, {
        headers: {
          Authorization: getToken() || "",
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostReviews();
  }, []); // Dependency array fixed

  const handleAddPost = async (post: IAdminPostsTable) => {
    try {
      const response = await axiosService.post(`/add-post`, post, {
        headers: {
          Authorization: getToken() || "",
        },
      });
      setPosts((prevPosts) => [
        ...(prevPosts as IAdminPostsTable[]),
        { ...post, isSubmitted: true },
      ]);
    } finally {
      console.log("error");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl text-primary font-bold">Instagram Posts</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {posts?.map((post, i) => (
          <Card key={i} className="w-full">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={"/assets/img/logo.png"}
                    alt={"Umah Shanti"}
                  />
                  <AvatarFallback>Umah Shanti</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Umah Shanti</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.date as string)}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-md">
                <img
                  src={post.imgUrl}
                  alt="Instagram post"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 fill-red-500 stroke-red-500" />
                <span className="text-sm font-medium">100K likes</span>
              </div>
              <p className="text-sm">{post.caption}</p>
            </CardContent>
            <CardFooter>
              {!post.isSubmitted ? (
                <Button
                  className="w-full bg-primary text-background hover:bg-primary"
                  onClick={() => handleAddPost(post)} // Correct method name
                >
                  Add Post
                </Button>
              ) : (
                <Button
                  className="w-full border border-primary text-primary"
                  variant="outline"
                  disabled
                >
                  Already Added
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
