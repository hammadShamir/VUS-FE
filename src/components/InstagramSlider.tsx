"use client";
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// import required modules
import { Autoplay, Scrollbar } from 'swiper/modules';
import Image from 'next/image';

export default function InstagramSlider() {
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
                <SwiperSlide>
                    <div className="aspect-[4/2] md:aspect-[4/4] md:rounded-xl overflow-hidden">
                        <Image
                            src="/assets/img/lawn/img-3.png"
                            alt="Luxury Room Interior"
                            width={600}
                            height={800}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="aspect-[4/2] md:aspect-[4/4] md:rounded-xl overflow-hidden">
                        <Image
                            src="/assets/img/Rooms/img-8.png"
                            alt="Luxury Room Interior"
                            width={600}
                            height={800}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="aspect-[4/2] md:aspect-[4/4] md:rounded-xl overflow-hidden">
                        <Image
                            src="/assets/img/Garden/img-1.png"
                            alt="Luxury Room Interior"
                            width={600}
                            height={800}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="aspect-[4/2] md:aspect-[4/4] md:rounded-xl overflow-hidden">
                        <Image
                            src="/assets/img/Rooms/img-10.png"
                            alt="Luxury Room Interior"
                            width={600}
                            height={800}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
