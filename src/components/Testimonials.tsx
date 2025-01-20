"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Swiper as SwiperType } from "swiper";
import Rating from "@/components/ui/Rating";
import Container from "./common/Container";
import { axiosService } from "@/services/axios";
import { IAdminReviewsTable } from "@/interfaces";

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperKey, setSwiperKey] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [reviews, setReviews] = useState<IAdminReviewsTable[]>();

  const getReviews = async () => {
    const reviews = await axiosService.get("/get-reviews");
    setReviews(reviews.data);
  };

  useEffect(() => {
    getReviews();

    const handleResize = () => {
      setSwiperKey((prevKey) => prevKey + 1);
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup resize event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full p-4 sm:p-8 relative bg-cover bg-center bg-no-repeat bg-[url('/assets/testimonials-bg.png')] bg-primary">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-4 lg:mb-8">
          <div className="md:w-3/5 flex items-center justify-between">
            <div data-aos="fade-right"  className="text-background text-center lg:text-left mb-4 sm:mb-0 space-y-2">
              <p className="text-sm font-[family-name:var(--font-secondary)] sm:text-base">
                Guest Review
              </p>
              <h2 className="text-2xl font-[family-name:var(--font-primary)] sm:text-4xl font-semibold">
                Voice From Our Guests
              </h2>
            </div>
            <div data-aos="fade-left" className="hidden md:flex z-10">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="text-background text-2xl py-4 px-6 cursor-pointer  transition"
              >
                <SlArrowLeft />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="text-background text-2xl py-4 px-6 cursor-pointer  transition"
              >
                <SlArrowRight />
              </button>
            </div>
          </div>
          <div data-aos="zoom-out-left" data-aos-delay="800" className="md:w-2/5 hidden lg:block">
            <Image
              src="/assets/img/side-img-1.png"
              alt="test"
              width={450}
              height={650}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div data-aos="zoom-out-up" data-aos-delay="500" className="relative lg:absolute inset-0 flex justify-center items-center text-center max-w-screen-xl text-background">
          <Swiper
            key={swiperKey} // Add key to force re-render on resize
            modules={[Pagination, A11y, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop
            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
            onSwiper={(swiperInstance) => (swiperRef.current = swiperInstance)}
            className="swiper relative lg:absolute inset-0"
          >
            {reviews?.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white/20 flex justify-center backdrop-blur-xl min-h-[400px] w-full p-2 rounded-2xl sm:p-2 md:p-12 lg:w-5/6">
                  <div className="grid lg:grid-cols-[20%_80%] gap-0">
                    <div className="flex flex-col justify-center col-span-1 text-background h-full gap-2 px-2 lg:gap-1">
                      <Image
                        src={testimonial.authorPic}
                        alt="TripAdvisor"
                        width={80}
                        height={100}
                      />
                      <Rating rating={testimonial.rating} />
                      <div className="text-left">
                        <p className="font-semibold text-background font-[family-name:var(--font-primary)] text-base sm:text-lg">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-background font-[family-name:var(--font-secondary)] my-2 sm:text-sm opacity-80">
                          {testimonial.date as Date}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1 text-start flex items-center">
                      <p className="text-xs text-background font-[family-name:var(--font-secondary)] sm:text-base md:text-lg">
                        {testimonial.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex justify-center gap-2 my-2">
          {reviews?.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-background w-14"
                  : "bg-white/50 w-2"
              }`}
              aria-label={`Slide ${index + 1}`}
              onClick={() => swiperRef.current?.slideTo(index)}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
