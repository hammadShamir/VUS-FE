"use client";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Autoplay, Scrollbar } from "swiper/modules";
import Image from "next/image";
import { axiosService } from "@/services/axios";
import { IAdminPostsTable } from "@/interfaces";

export default function InstagramSlider() {
  const images = [
    {
      _id: "1",
      caption: "",
      imgUrl: "/assets/img/Rooms/img-8.png",
      postId: "",
    },
    {
      _id: "2",
      caption: "",
      imgUrl: "/assets/img/Garden/img-2.jpg",
      postId: "",
    },
    {
      _id: "3",
      caption: "",
      imgUrl: "/assets/img/Pool/img-1.png",
      postId: "",
    },
    {
      _id: "4",
      caption: "",
      imgUrl: "/assets/img/Sanitary/img-1.png",
      postId: "",
    },
  ];
  const [post, setPost] = useState<IAdminPostsTable[]>(images);

  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const response = await axiosService.get("/get-posts?isActive=true");
    if (response.data.length) {
      setPost(response.data);
    }
  };

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        scrollbar={{
          hide: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop
        modules={[Scrollbar, Autoplay]}
        className="mySwiper"
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
        }}
      >
        {post?.map((data, i: number) => (
          <SwiperSlide key={i}>
            <div className="relative aspect-[4/2] md:aspect-[4/4] md:rounded-xl overflow-hidden group">
              <Image
                src={data.imgUrl || "/placeholder.svg"}
                alt={data.caption || "Instagram Post"}
                width={600}
                height={800}
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              {data.caption && (
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 flex items-center justify-center">
                  <p className="text-white text-center px-4 py-2 text-lg font-semibold">
                    {data.caption}
                  </p>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
