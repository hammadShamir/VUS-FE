import React from "react";
import BookingParameter from "../ui/Booking-parameter";

interface IBanner {
  bgImg: string;
  title: string;
  breadCrumbs?: {
    current: string;
    prev: string;
  };
  para: string;
  parameters?: boolean;
}

const Banner: React.FC<IBanner> = (banner) => {
  console.log(banner.bgImg);
  return (
    <div
      className={`relative ${
        banner.parameters ? "h-screen" : "h-[calc(100vh-200px)]"
      } bg-no-repeat bg-center bg-cover bg-fixed flex justify-center items-center`}
      style={{
        backgroundImage: `url(${banner?.bgImg})`,
      }}
    >
      <div className="absolute top-o left-0 w-full h-full bg-black opacity-40"></div>
      <div className="z-10 max-w-screen-md space-y-4">
        <h1 data-aos="fade-up" data-aos-delay ={100} className="text-background text-3xl md:text-6xl font-[family-name:var(--font-primary)] text-center">
          {banner.title}
        </h1>
        {banner.breadCrumbs && <div></div>}
        <p data-aos="fade-up" data-aos-delay ={300}  className="text-background text-base md:text-2xl text-center font-[family-name:var(--font-secondary)]">
          {banner.para}
        </p>
        {banner.parameters && (
          <div data-aos="fade-up" data-aos-delay ={400}>
            <BookingParameter />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
