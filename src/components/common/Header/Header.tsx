"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ModalSidebar from "../Sidebar";
import Link from "next/link";
import Hamburger from "@/elements/Hamburger";
// import LocaleDropdown from "@/elements/LocaleDropdown";
import { useRouter } from "next/navigation";
import { isAuthenticated as checkAuth, logout } from "@/services/helper";
import { UserMenu } from "@/elements/UserMenu";
import Container from "../Container";

const Header = () => {
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authenticated, setAuthenticated] = useState(!!checkAuth());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
  };
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "py-2 bg-[#002655CC]" : "py-2 md:py-4 bg-transparent"
      }`}
    >
      <Container style="relative flex justify-between">
        <div className="max-w-screen-sm w-full flex jusitfy-center items-center space-x-8">
          <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
          {/* <LocaleDropdown /> */}
        </div>

        <div className="w-full">
          {isScrolled ? (
            <Link
              href="/"
              className="text-md text-background sm:text-xl w-full h-full flex justify-center items-center"
            >
              UMAH SHANTI
            </Link>
          ) : (
            <Link
              href="/"
              className="w-full h-full flex justify-center items-center"
            >
              <Image
                src={"/assets/img/logo.png"}
                alt="Logo"
                height={70}
                width={70}
                className="lg:absolute lg:top-0 hidden md:block"
              />
            </Link>
          )}
        </div>

        <div className="max-w-screen-sm w-full flex justify-end items-center space-x-8">
          <button
            onClick={() => navigate.push("/booking")}
            className={`border border-background text-background ${
              isScrolled ? "bg-transparent" : "text-background"
            } px-5 py-2 rounded-md hover:bg-primary hover:border-primary`}
          >
            <span className="hidden lg:inline">Book Now</span>
            <span className="inline lg:hidden">Book</span>
          </button>
          {authenticated ? (
            <UserMenu onLogout={handleLogout} />
          ) : (
            <Link href="/login" className="text-background hidden lg:inline">
              SIGN IN
            </Link>
          )}
        </div>
      </Container>
      <ModalSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isScrolled={isScrolled}
      />
    </header>
  );
};

export default Header;
