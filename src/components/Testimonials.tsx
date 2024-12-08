"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Swiper as SwiperType } from "swiper";
import { Testimonial } from "@/interfaces/Testimonials";
import Rating from "@/components/ui/Rating";
import Container from "./common/Container";

const testimonials: Testimonial[] = [
  {
    author: "Emily and Mark T.",
    date: "19-10-2024",
    content:
      "Staying at Umah Shanti Villas was a dream come true! The villas are beautifully designed and provide the perfect escape from the hustle and bustle of everyday life. The serene surroundings and attentive staff made our experience unforgettable. We can’t wait to come back! and attentive staff made our experience unforgettable. We can’t wait to come back!  and attentive staff made our experience unforgettable. We can’t wait to come back! ",
    rating: 5,
  },
  {
    author: "Sarah J.",
    date: "12-10-2024",
    content:
      "Staying at Umah Shanti Villas was a dream come true! The villas are beautifully designed and provide the perfect escape from the hustle and bustle of everyday life. The serene surroundings and attentive staff made our experience unforgettable. We can’t wait to come back! and attentive staff made our experience unforgettable. We can’t wait to come back!  and attentive staff made our experience unforgettable. We can’t wait to come back!",
    rating: 5,
  },
  {
    author: "Michael R.",
    date: "10-10-2024",
    content:
      "Staying at Umah Shanti Villas was a dream come true! The villas are beautifully designed and provide the perfect escape from the hustle and bustle of everyday life. The serene surroundings and attentive staff made our experience unforgettable. We can’t wait to come back! and attentive staff made our experience unforgettable. We can’t wait to come back!  and attentive staff made our experience unforgettable. We can’t wait to come back!",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <div
      style={{ backgroundImage: "/assets/testimonials-bg.png" }}
      className="w-full p-4 sm:p-8 relative bg-cover bg-center bg-no-repeat bg-[url('/assets/testimonials-bg.png')] bg-primary"
    >
      <Container>
        <div className=" flex flex-col lg:flex-row justify-between items-center lg:items-start mb-4 lg:mb-8">
          <div className="md:w-3/5 flex items-center justify-between">
            <div className="text-background text-center lg:text-left mb-4 sm:mb-0 space-y-2">
              <p className="text-sm font-[family-name:var(--font-secondary)] sm:text-base">
                Guest Review
              </p>
              <h2 className="text-2xl font-[family-name:var(--font-primary)] sm:text-4xl font-semibold">
                Voice From Our Guests
              </h2>
            </div>
            <div className="hidden md:flex">
              <button
                onClick={() => swiper?.slidePrev()}
                className="text-background  text-2xl py-4 lg:py-6 px-6  cursor-pointer"
              >
                <SlArrowLeft />
              </button>

              <button
                onClick={() => swiper?.slideNext()}
                className="text-background text-2xl py-4 lg:py-6 px-6  cursor-pointer"
              >
                <SlArrowRight />
              </button>
            </div>
          </div>
          <div className="md:w-2/5 hidden lg:block">
            <div className="border-0 m-0 p-0 bg-transparent">
              <Image
                src={"/assets/img/side-img-1.png"}
                alt="test"
                width={450}
                height={650}
              />
            </div>
          </div>
        </div>
        <div className=" relative lg:absolute px-2 lg:text-left  inset-0 flex justify-center items-center text-center max-w-screen-lg  text-background">
          <Swiper
            modules={[Pagination, A11y, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop
            onSwiper={setSwiper}
            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
            className="relative lg:absolute inset-0"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white/20 backdrop-blur-xl w-full p-2 rounded-2xl sm:p-8 md:p-12 lg:w-5/6 ">
                  <div className="grid lg:grid-cols-3 sm:gap-8 ">
                    <div className="flex flex-col justify-between col-span-1  text-background h-full  gap-2 lg:gap-1">
                      <div>
                        <Image
                          src="/assets/logo-review.png"
                          alt="TripAdvisor"
                          width={400}
                          height={100}
                        />
                      </div>
                      <div>
                        <Rating rating={3.5} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-background font-[family-name:var(--font-primary)] text-base sm:text-lg">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-background font-[family-name:var(--font-secondary)] my-2 sm:text-sm opacity-80">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2 text-start ">
                      <p className="text-xs text-background font-[family-name:var(--font-secondary)]  sm:text-base md:text-lg ">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Custom Pagination */}
                <div className="flex justify-center gap-2">
                  {testimonials.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${currentSlide === index
                        ? "bg-background w-14"
                        : "bg-white/50 w-2"
                        }`}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
}
