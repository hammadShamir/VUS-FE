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
  const [post, setPost] = useState<IAdminPostsTable[]>();
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const response = await axiosService.get("/get-posts?isActive=true");
    setPost(response.data);
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
        {post?.map((data, i: number) => {
          return (
            <SwiperSlide key={i}>
              <div className="aspect-[4/2] md:aspect-[4/4] md:rounded-xl overflow-hidden">
                <Image
                  src={data.imgUrl}
                  alt="Luxury Room Interior"
                  width={600}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
