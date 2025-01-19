import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { IAdminPostsTable } from "@/interfaces";
import { axiosService } from "@/services/axios";
import { getToken } from "@/services/helper";
import { useModal } from "@/context/Modal";
import Image from "next/image";

export function ViewPostModal({ post }: { post: IAdminPostsTable }) {
  const { hideModal } = useModal();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const handlePostStatus = async (payload: Partial<IAdminPostsTable>) => {
    await axiosService.put(`/update-post/${post._id}`, payload, {
      headers: {
        Authorization: getToken() || "",
      },
    });
    hideModal(true);
  };

  return (
    <div>
      <div className="flex items-center space-x-4 p-2">
        <Avatar>
          <AvatarImage src={"/assets/img/logo.png"} alt={"Umah Shanti"} />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold font-[family-name:var(--font-primary)] ">
            Umah Shanti
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatDate((post.date as string) || "12/3/23")}
          </p>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="aspect-square  h-1/2  flex justify-center relative  overflow-hidden rounded-md mb-4">
          <Image
            src={post.imgUrl}
            alt="Instagram post"
            height={300}
            width={300}
          />
        </div>
      </div>

      <p className="text-md font-[family-name:var(--font-secondary)] ">
        {post.caption}
      </p>
      {post.isActive ? (
        <div className="col-span-2 flex justify-end self-end">
          <Button
            onClick={() => {
              handlePostStatus({ isActive: false });
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
              handlePostStatus({ isActive: true });
            }}
            className="bg-green-600 text-background mr-2"
            variant={"outline"}
          >
            Active
          </Button>
        </div>
      )}
    </div>
  );
}
