"use client";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface ModalSidebarProps {
  isOpen: boolean;
  isScrolled: boolean;
  toggleSidebar: () => void;
}

const ModalSidebar: React.FC<ModalSidebarProps> = ({
  isOpen,
  toggleSidebar,
  isScrolled
}) => {
  const [showCloseButton, setShowCloseButton] = useState(false);

  // Effect to delay showing the close button for 1 second
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        setShowCloseButton(true);
      }, 10);
    } else {
      setShowCloseButton(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <section
      className={`fixed inset-0 bg-white z-50 transition-opacity duration-2000 ease-in-out px-6 xl:px-0 ${isOpen ? "block opacity-100" : "none opacity-0 pointer-events-none"
        }`}
    >
      <div
        className={`max-w-screen-xl mx-auto
          z-50 transition-all duration-500 ease-in-out`}
      >
        {" "}
        {/* Added py-5 for extra padding */}
        <div className={`max-w-full mx-auto py-2 ${isScrolled ? 'py-2' : 'py-4'}`}>
          <div className="relative flex justify-between items-center">
            {/* Hamburger Menu Button */}
            <div className="flex space-x-10">
              <button
                onClick={toggleSidebar}
                className="relative w-10 h-8 flex flex-col justify-center items-center group"
              >
                {/* Line 1 */}
                <div
                  className={`absolute w-full h-1 bg-black transition-transform duration-300 ${showCloseButton ? "rotate-45" : "-translate-y-2"
                    }`}
                ></div>
                {/* Line 2 */}
                <div
                  className={`absolute w-full h-1 
                      bg-black
                    transition-transform duration-300 ${showCloseButton ? "-rotate-45" : "translate-y-2"
                    }`}
                ></div>
              </button>
              <div className="text-primary text-xl flex items-center">
                EN <MdKeyboardArrowDown className="text-primary" />
              </div>
            </div>

            {/* Logo */}
            <div className="block ">
              {" "}
              <p className="text-xl font-secondary ">UMAHH SHANTI </p>
              {/* Added flex-grow for centering */}
            </div>

            {/* Desktop Links */}
            <div className="flex justify-center items-center gap-10">
              <a
                href="#"
                className={` "text-black" 
                   hidden lg:inline`}
              >
                SIGN IN
              </a>
              <button
                className={`border border-primary text-primary 
                px-4 py-2 rounded-md hover:bg-primary hover:text-background`}
              >
                <span className="hidden lg:inline">Book Now</span>
                <span className="inline lg:hidden">Book</span>
              </button>
            </div>
          </div>
        </div>
        {/* Modal Sidebar */}
      </div>
      <div className="max-w-screen-xl mx-auto mt-24">
        <ul className="space-y-8">
          <li>
            <a href="#" className="text-2xl text-black hover:text-gray-500">
              Overview
            </a>
          </li>
          <li>
            <a href="#" className="text-2xl text-black hover:text-gray-500">
              Rooms & Suites
            </a>
          </li>
          <li>
            <a href="#" className="text-2xl text-black hover:text-gray-500">
              Restaurants & Bars
            </a>
          </li>
          <li>
            <a href="#" className="text-2xl text-black hover:text-gray-500">
              Luxury Spa
            </a>
          </li>
          <li>
            <a href="#" className="text-2xl text-black hover:text-gray-500">
              Gallery
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ModalSidebar;
