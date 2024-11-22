"use client";
import Image from "next/image";
// import LanguageChanger from "./LanguageChanger";
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
import Hamburger from "@/elements/Hamburger";
import { ISidebar } from "@/interfaces";
import Link from "next/link";


const ModalSidebar: React.FC<ISidebar> = (props) => {

  return (
    <section
      className={`fixed inset-0 bg-primary text-background z-50 transition-opacity duration-300 ease-in-out ${props.isOpen ? "opacity-1" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="h-full max-w-screen-2xl w-11/12 mx-auto z-50 transition-transform duration-500 ease-in-out overflow-y-auto  ">
        <div className={`w-full py-4`}>
          <div className="relative flex justify-between items-center">
            <div className="flex space-x-10">
              <Hamburger isOpen={props.isOpen} setIsOpen={props.setIsOpen} />
              {/* <LanguageChanger className="relative" color="primary" /> */}
            </div>
            <div className="hidden lg:block">
              <p className="text-xl font-secondary">UMAH SHANTI</p>
            </div>
            <div className="flex justify-center items-center gap-10">
              <a href="#" className="text-background hidden lg:inline">
                SIGN IN
              </a>
              <button className="border border-background text-background bg-primary px-5 py-2 rounded-md hover:bg-background">
                <span className="hidden lg:inline">Book Now</span>
                <span className="inline lg:hidden">Book</span>
              </button>
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
                <Link
                  href="/booking"
                  className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2"
                >
                  Booking
                </Link>
              </li>
              <li>
                <Link
                  href="contact"
                  className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-2xl hover:text-secondary transition-transform duration-300 transform hover:translate-x-2"
                >
                  Gallery
                </Link>
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
              src="/assets/img/lawn/img-2.png"
              alt="Villa"
              height={300}
              width={300}
            />
          </div>
          <div className="bg-background text-gray-800 p-8">
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
