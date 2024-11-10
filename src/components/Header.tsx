"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ModalSidebar from "./Sidebar";
import LanguageChanger from "./LanguageChanger";
import Link from "next/link";

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
      className={`fixed top-0 left-0 w-full px-6 z-50 transition-all duration-500 ease-in-out ${isScrolled ? "py-2 bg-[#002655CC]" : "py-4 bg-transparent"
        }`}
    >
      <div className="max-w-screen-2xl w-full mx-auto relative flex justify-between items-center">
        <div className="flex jusitfy-center items-center space-x-8">
          <button
            onClick={toggleSidebar}
            className="relative w-10 h-8 flex flex-col justify-center items-center group"
          >
            <div
              className={`absolute w-full h-1 bg-background transition-transform duration-300 ${isOpen ? "rotate-45" : "-translate-y-2"
                }`}
            ></div>
            <div
              className={`absolute w-full h-1 bg-background
                transition-transform duration-300 ${isOpen ? "-rotate-45" : "translate-y-2"
                }`}
            ></div>
          </button>
         
          <LanguageChanger className="hidden lg:block relative" />
        </div>

        <div className="flex-1 flex justify-center items-center">
          {isScrolled ? (
            <p className="text-xl text-background ">UMAH SHANTI</p>
          ) : (
            <Image
              src={"/assets/img/logo.png"}
              alt="Logo"
              height={70}
              width={70}
              className="lg:absolute lg:top-0 sm:block"
            />
          )}
        </div>

        <div className="flex justify-center items-center gap-10">
          <Link href="/login" className="text-background hidden lg:inline">
            SIGN IN
          </Link>
          <button
            className={`border border-background text-background ${isScrolled ? "bg-transparent" : "text-background"
              } px-5 py-2 rounded-md hover:bg-primary`}
          >
            <span className="hidden lg:inline">Book Now</span>
            <span className="inline lg:hidden">Book</span>
          </button>
        </div>
      </div>
      <ModalSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isScrolled={isScrolled} />
    </header>
  );
};

export default Header;
