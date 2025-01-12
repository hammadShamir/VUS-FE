import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import { IAdminPostsTable } from "@/interfaces";

export function ViewPostModal({ post }: { post: IAdminPostsTable }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={"/assets/img/logo.png"} alt={"Umah Shanti"} />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">Umah Shanti</h3>
          <p className="text-sm text-muted-foreground">
            {formatDate((post.date as string) || "12/3/23")}
          </p>
        </div>
      </div>

      <div className="aspect-square relative overflow-hidden rounded-md mb-4">
        <img
          src={post.imgUrl}
          alt="Instagram post"
          className="object-cover w-full h-full"
        />
      </div>

      <p className="text-sm text-gray-600">{post.caption}</p>
    </div>
  );
}
