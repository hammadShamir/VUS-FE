"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Testimonial } from "@/interfaces/Testimonials";

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
  const [swiper, setSwiper] = useState<any>(null);

  return (
    <div className="w-full bg-primary p-4 sm:p-8 relative bg-cover bg-center bg-no-repeat">
      <div className="my-4 mx-4 lg:mx-32 lg:file:my-14">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-4 lg:mb-8">
          <div className="text-background text-center lg:text-left mb-4 sm:mb-0">
            <p className="text-sm font-[family-name:var(--font-secondary)]sm:text-base">
              Guest Review
            </p>
            <h2 className="text-2xl font-[family-name:var(--font-primary)] sm:text-4xl font-semibold">
              Voice From Our Guests
            </h2>
          </div>
          <div className="hidden lg:block">
            <div className="border-0 m-0 p-0 bg-transparent">
              <Image
                src={"/assets/img/side-img-1.png"}
                alt="test"
                width={500}
                height={700}
              />
            </div>
          </div>
        </div>
        <div className="relative mx-auto lg:absolute inset-0 flex justify-center items-center text-center w-full sm:w-4/6 text-white">
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
                <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 sm:p-8 md:p-12 w-full mx-auto">
                  <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 items-center">
                    <div className="space-y-4 text-background">
                      <div className="flex justify-start">
                        <Image
                          src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg"
                          alt="TripAdvisor"
                          width={200}
                          height={50}
                          className="h-6 sm:h-8 w-auto"
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-base sm:text-lg">
                          {testimonial.author}
                        </p>
                        <p className="text-xs sm:text-sm opacity-80">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>

                    <div className="text-background">
                      <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Custom Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-background w-8" : "bg-white/50 w-2"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div
          onClick={() => swiper?.slidePrev()}
          className="text-background absolute left-4 top-1/2 transform -translate-y-1/2 text-5xl py-6 px-8 cursor-pointer"
        >
          <SlArrowLeft />
        </div>

        <div
          onClick={() => swiper?.slideNext()}
          className="text-background absolute right-4 top-1/2 transform -translate-y-1/2 text-5xl py-6 px-8 cursor-pointer"
        >
          <SlArrowRight />
        </div>
      </div>
    </div>
  );
}
