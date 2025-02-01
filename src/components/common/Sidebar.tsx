"use client";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import Hamburger from "@/elements/Hamburger";
import { ISidebar } from "@/interfaces";
import Link from "next/link";
import Container from "./Container";
import { UserMenu } from "@/elements/UserMenu";
import { isAuthenticated as checkAuth, logout } from "@/services/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

const ModalSidebar: React.FC<ISidebar> = (props) => {
  const [authenticated, setAuthenticated] = useState(!!checkAuth());
  const navigate = useRouter();
  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    navigate.push("/");
  };
  const handleredirect = () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate.push("/login?message=Login Required&redirect=mybooking");
      return;
    }else{
      navigate.push("/mybooking")
    }
  }
  return (
    <section
      className={`fixed inset-0 overflow-auto bg-primary text-background z-50 transition-opacity duration-300 ease-in-out ${props.isOpen ? "opacity-1" : "opacity-0 pointer-events-none"
        }`}
    >
      <Container style="z-50 transition-transform duration-500 ease-in-out overflow-y-auto ">
        <div className={`w-full py-2`}>
          <div className="relative flex justify-between items-center">
            <div className="max-w-screen-sm w-full flex space-x-10">
              <Hamburger isOpen={props.isOpen} setIsOpen={props.setIsOpen} />
            </div>
            <div className="w-full hidden lg:block">
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
                className={`border border-background text-background text-background
                        px-5 py-2 rounded-md hover:bg-primary hover:border-primary`}
              >
                <span className="hidden lg:inline">Book Now</span>
                <span className="inline lg:hidden">Book</span>
              </button>
              {authenticated ? (
                <UserMenu onLogout={handleLogout} />
              ) : (
                <Link
                  href="/login"
                  className="text-background hidden lg:inline"
                >
                  SIGN IN
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div
          className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 py-4"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="">
            <ul className="space-y-6">
              <li>
                <Link
                  href="/"
                  className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities"
                  className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2"
                >
                  Facilities
                </Link>
              </li>
              <li>
                <span
                  onClick={handleredirect}
                  className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2 cursor-pointer"
                >
                  My Booking
                </span>
              </li>
              <li>
                <Link
                  href="contact"
                  className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2"
                >
                  Contact Us
                </Link>
              </li>
              {!authenticated && (
                <li className="block lg:hidden">
                  <Link
                    href="/login"
                    className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>

            <div className="flex flex-col lg:flex-row gap-2 my-10 lg:justify-between">
              <ul className="space-y-2 mt-4 lg:mt-0">
                <li>
                  <a href="#" className="block text-sm hover:text-secondary">
                    PRIVACY
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-sm hover:text-secondary">
                    TERMS OF USE
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-sm hover:text-secondary">
                    POLICY
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative w-full">
            <div className="aspect-[4/2] md:aspect-[4/5] overflow-hidden">
              <Image
                src="/assets/img/Lawn/img-2.png"
                alt="Villa"
                width={600}
                height={800}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="bg-background text-gray-800 p-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Info</h2>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-primary" />
                <p className="text-sm">
                  Jl. RSI Markandya 2, Gang Mawar, <br />
                  Banjar Sebali, Desa Keliki,
                  <br />
                  Kecamatan Tegallalang - Bali, Indonesia
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-primary" />
                <p className="text-sm">Phone: +62 361 898 9127</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-primary" />
                <p className="text-sm">Email: umahshantivilla@gmail.com</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-lg font-semibold">Stay Connected</h2>
              <div className="flex space-x-4 text-primary">
                <a href="#" className="hover:text-gray-800">
                  <FaFacebook />
                </a>
                <a href="#" className="hover:text-gray-800">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-gray-800">
                  <FaPinterest />
                </a>
                <a href="#" className="hover:text-gray-800">
                  <FaYoutube />
                </a>
                <a href="#" className="hover:text-gray-800">
                  <FaInstagram />
                </a>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-600">
              © Copyright {new Date().getFullYear()} Umah Shanti Hotel Booking.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ModalSidebar;
