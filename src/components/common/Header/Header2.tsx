"use client";
import React, { useState } from "react";
import Hamburger from "@/elements/Hamburger";
import ModalSidebar from "../Sidebar";
import { isAuthenticated as checkAuth, logout } from "@/services/helper";
import { UserMenu } from "@/elements/UserMenu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "../Container";

const Header2 = () => {
  const [authenticated, setAuthenticated] = useState(!!checkAuth());
  const navigate = useRouter();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    navigate.push("/");
  };
  return (
    <header className="bg-primary py-4 fixed w-full top-0 left-0 z-10">
      <Container style="flex items-center justify-between">
        <div className="max-w-screen-sm w-full flex jusitfy-center items-center space-x-8">
          <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="hidden md:block w-full flex justify-center items-center">
          <Link
            href="/"
            className="text-md text-background sm:text-xl w-full h-full flex justify-center items-center"
          >
            UMAH SHANTI
          </Link>
        </div>
        <div className="max-w-screen-sm w-full flex justify-end items-center space-x-8">
          <button
            onClick={() => navigate.push("/booking")}
            className={`hidden md:block border border-background text-background text-background
                        px-5 py-2 rounded-md hover:bg-primary hover:border-primary`}
          >
            <span className="hidden lg:inline">Book Now</span>
            <span className="inline lg:hidden">Book</span>
          </button>
          <div className="block">
            {authenticated ? (
              <UserMenu onLogout={handleLogout} />
            ) : (
              <Link href="/login" className="text-background hidden lg:inline">
                SIGN IN
              </Link>
            )}
          </div>
        </div>
      </Container>
      <ModalSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header2;
