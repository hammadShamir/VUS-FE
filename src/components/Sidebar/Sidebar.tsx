"use client";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import logo from "../../../public/assests/web-logo.png";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";

interface ModalSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ModalSidebar: React.FC<ModalSidebarProps> = ({
  isOpen,
  toggleSidebar,
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
    <>
      <div
        className={`fixed inset-0 bg-white z-50 transition-opacity duration-2000 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <nav
          className={`fixed top-0 left-0 w-full
            bg-white
          z-50 transition-all duration-500 ease-in-out`}
        >
          {" "}
          {/* Added py-5 for extra padding */}
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-6">
            <div className="flex justify-between items-center h-20">
              {/* Hamburger Menu Button */}
              <div className="flex space-x-10">
                <button
                  onClick={toggleSidebar}
                  className="relative w-10 h-8 flex flex-col justify-center items-center group"
                >
                  {/* Line 1 */}
                  <div
                    className={`absolute w-full h-1 bg-black transition-transform duration-300 ${
                      showCloseButton ? "rotate-45" : "-translate-y-2"
                    }`}
                  ></div>
                  {/* Line 2 */}
                  <div
                    className={`absolute w-full h-1 
                      bg-black
                    transition-transform duration-300 ${
                      showCloseButton ? "-rotate-45" : "translate-y-2"
                    }`}
                  ></div>
                </button>
                <div className="text-white text-xl flex items-center">
                  EN <MdKeyboardArrowDown className="text-white" />
                </div>
              </div>

              {/* Logo */}
              <div className="block ">
                {" "}
                <Image src={logo} alt="Logo" className="h-20 w-auto mt-11 " />
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
                  className={`border border-white text-white bg-primary" 
                  }  px-4 py-2 rounded-md hover:bg-primary`}
                >
                  <span className="hidden lg:inline">Book Now</span>
                  <span className="inline lg:hidden">Book</span>
                </button>
              </div>
            </div>
          </div>
          {/* Modal Sidebar */}
          <ModalSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </nav>
        <ul className="mt-24 space-y-8 px-8">
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
    </>
  );
};

export default ModalSidebar;
