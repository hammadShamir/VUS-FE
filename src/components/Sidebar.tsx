"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LanguageChanger from "./LanguageChanger";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFax,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

interface ModalSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isScrolled: boolean
}

const ModalSidebar: React.FC<ModalSidebarProps> = ({
  isOpen,
  toggleSidebar,
  isScrolled
}) => {
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        setShowCloseButton(true);
      }, 10);
      // Disable body scroll when modal is open
      // document.body.style.overflow = "hidden";
    } else {
      setShowCloseButton(false);
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = "auto";
    }

    return () => {
      clearTimeout(timer);
      // Make sure to reset body overflow on component unmount
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <section
      className={`fixed inset-0 bg-primary text-background z-50 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-1" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="w-full h-full max-w-screen-2xl px-6  mx-auto z-50 transition-transform duration-500 ease-in-out overflow-y-auto">
        <div className={`max-w-full mx-auto  ${isScrolled ? "py-2" : "py-4"}`}>
          <div className="relative flex justify-between items-center">
            <div className="flex space-x-10">
              <button
                onClick={toggleSidebar}
                className="relative w-10 h-8 flex flex-col justify-center items-center group"
              >
                <div
                  className={`absolute w-full h-1 bg-background transition-transform duration-300 ${showCloseButton ? "rotate-45" : "-translate-y-2"
                    }`}
                ></div>
                <div
                  className={`absolute w-full h-1 bg-background transition-transform duration-300 ${showCloseButton ? "-rotate-45" : "translate-y-2"
                    }`}
                ></div>
              </button>
              <LanguageChanger className="relative" color="primary" />
            </div>
            <div className="hidden lg:block">
              <p className="text-xl font-secondary">UMAH SHANTI</p>
            </div>
            <div className="flex justify-center items-center gap-10">
              <a href="#" className="text-black hidden lg:inline">
                SIGN IN
              </a>
              <button className="border border-primary text-background bg-primary px-5 py-2 rounded-md hover:bg-primary">
                <span className="hidden lg:inline">Book Now</span>
                <span className="inline lg:hidden">Book</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div
          className="max-w-screen-xl mx-auto mt-3 lg:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-4 md:overflow-y-auto  "
          style={{ scrollbarWidth: "none" }}
        >
          <div className="">
            <ul className="space-y-8 my-3 lg:my-10 ">
              <li>
                <a
                  href="#"
                  className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2"
                >
                  Facilities
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2"
                >
                  Booking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2"
                >
                  Gallery
                </a>
              </li>
            </ul>

            <div className="flex flex-col lg:flex-row gap-2 my-10 lg:justify-between">
              <ul className="space-y-2  lg:mr-10">
                <li>
                  <a href="#" className="block text-sm hover:text-secondary">
                    ACTIVITY DETAIL
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-sm hover:text-secondary">
                    SALON PRICE LIST
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-sm hover:text-secondary">
                    THE RESTAURANT
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-sm hover:text-secondary">
                    OUR BLOG
                  </a>
                </li>
              </ul>
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
          <div className="flex justify-center">
            <Image
              src="https://img.freepik.com/premium-photo/generative-ai-illustration-modern-minimalist-cubic-villa-with-swimming-pool_101296-2123.jpg?w=360"
              alt="Villa"
              height={300}
              width={300}
            />
          </div>
          <div className="bg-secondary text-gray-800 p-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Info</h2>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-primary" />
                <p className="text-sm">
                  1250 West 6th Ave, New York <br />, NY 10036, United States
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-primary" />
                <p className="text-sm">Phone: +1 212 555 6688</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaFax className="text-primary" />
                <p className="text-sm">Fax: +1 212 555 6699</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-primary" />
                <p className="text-sm">Email: info@cozystay.com</p>
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
      </div>
    </section>
  );
};

export default ModalSidebar;
