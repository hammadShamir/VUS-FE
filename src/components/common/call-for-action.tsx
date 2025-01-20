import Link from "next/link";
import React from "react";

interface sidFotProps {
  // Add any custom props you might need, like a custom class name or additional content
  className?: string;
}

const CallForAction: React.FC<sidFotProps> = ({ className }) => {
  return (
    <section
      className={`bg-secondary py-12 flex flex-col justify-center items-center space-y-4 ${className}`}
    >
      <div data-aos="fade-up" className="text-center text-2xl lg:text-4xl font-bold text-primary ">
        Show Us Your @Umahshantivilla
      </div>
      <p  data-aos="fade-up" data-aos-delay="500" className="text-center text-primary sm:text-sm">
        Our guests always travel the world in style. Share your own experiences
        using the username @Kempinskibali.
      </p>
      <div  data-aos="fade-up" data-aos-delay="800" className="flex gap-x-4">
        <div>
          <Link href={'/contact'} className="bg-transparent font-bold text-sm text-primary border border-primary px-4 py-2 rounded-md hover:bg-primary hover:text-background">
            CONTACT US
          </Link>
        </div>
        <div>
          <Link href={'/booking'} className="border border-primary bg-primary font-bold text-sm text-white px-4 py-2 rounded-md box-border hover:bg-transparent hover:text-primary">
            RESERVE NOW
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallForAction;
