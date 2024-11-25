import React from "react";

interface sidFotProps {
  // Add any custom props you might need, like a custom class name or additional content
  className?: string;
}

const CallForAction: React.FC<sidFotProps> = ({ className }) => {
  return (
    <footer
      className={`bg-secondary py-14 flex flex-col justify-center items-center ${className}`}
    >
      <div className="text-center text-2xl lg:text-4xl font-bold text-primary ">
        Show Us Your @Umahshantivilla
      </div>
      <p className="text-center text-primary mt-4 sm:text-sm">
        Our guests always travel the world in style. Share your own experiences
        using the username @Kempinskibali.
      </p>
      <div className="flex mt-8">
        <button className="bg-transparent font-bold text-sm text-primary border border-primary px-4 py-1 rounded-md mr-4">
          CONTACT US
        </button>
        <button className="bg-primary font-bold text-sm text-white px-4 py-2 rounded-md box-border">
          RESERVE NOW
        </button>
      </div>
    </footer>
  );
};

export default CallForAction;
