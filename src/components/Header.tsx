"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ModalSidebar from "./Sidebar/Sidebar";
import { MdKeyboardArrowDown } from "react-icons/md";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full px-6 xl:px-0 ${isScrolled ? "py-2 bg-white" : "py-4 bg-transparent"
        } z-50 transition-all duration-500 ease-in-out`}
    >
      {" "}
      {/* Added py-5 for extra padding */}
      <div className="max-w-screen-xl mx-auto">
        <div className="w-full relative flex justify-between items-center">
          {/* Hamburger Menu Button */}
          <div className="flex space-x-10">
            <button
              onClick={toggleSidebar}
              className="relative w-10 h-8 flex flex-col justify-center items-center group"
            >
              {/* Line 1 */}
              <div
                className={`absolute w-full h-1 ${isScrolled ? "bg-black" : "bg-white"
                  } transition-transform duration-300 ${isOpen ? "rotate-45" : "-translate-y-2"
                  }`}
              ></div>
              {/* Line 2 */}
              <div
                className={`absolute w-full h-1 ${isScrolled ? "bg-black" : "bg-white"
                  } transition-transform duration-300 ${isOpen ? "-rotate-45" : "translate-y-2"
                  }`}
              ></div>
            </button>
            <div className="text-white text-xl flex items-center">
              EN <MdKeyboardArrowDown className="text-white" />
            </div>
          </div>

          {/* Logo */}
          <div className="block">
            {" "}
            {isScrolled ? (
              <p className="text-xl font-secondary ">UMAHH SHANTI </p>
            ) : (
              <Image src={'/assets/img/logo.png'} alt="Logo" height={70} width={70} className="absolute top-0" />
            )}
            {/* Added flex-grow for centering */}
          </div>

          {/* Desktop Links */}
          <div className="flex justify-center items-center gap-10">
            <a
              href="#"
              className={` ${isScrolled ? "text-black" : "text-white"
                } hidden lg:inline`}
            >
              SIGN IN
            </a>
            <button
              className={`border border-white text-white ${isScrolled ? "bg-primary" : "text-white"
                }  px-4 py-2 rounded-md hover:bg-primary`}
            >
              <span className="hidden lg:inline">Book Now</span>
              <span className="inline lg:hidden">Book</span>
            </button>
          </div>
        </div>
      </div>
      {/* Modal Sidebar */}
      <ModalSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isScrolled={isScrolled} />
    </header>
  );
};

export default Header;
