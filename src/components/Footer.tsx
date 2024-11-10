import Image from "next/image";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-primary bg-[url('/assets/img/bubble-bg.png')]">
      <div className="max-w-screen-xl mx-auto px-6 2xl:px-0 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 py-6 md:py-12 text-background gap-6 lg:gap-12">
        {/* Intro */}
        <div className="lg:col-span-2 space-y-4">
          <Image
            src={"/assets/img/logo.png"}
            alt="Logo"
            height={70}
            width={70}
            className=""
          />
          <p className="text-base font-bold font-[family-name:var(--font-secondary)]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eroselementum tristique. </p>
        </div>

        {/* Pages Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-[family-name:var(--font-primary)]">Page</h3>
          <ul className="w-full flex justify-start items-center gap-2 md:block md:space-y-2 font-[family-name:var(--font-secondary)]">
            <li>
              <Link href={''}>Home</Link>
            </li>
            <li>
              <Link href={''}>About</Link>
            </li>
            <li>
              <Link href={''}>Services</Link>
            </li>
            <li>
              <Link href={''}>Contact Us</Link>
            </li>
          </ul>
        </div>
        {/* Contacts */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-bold font-[family-name:var(--font-primary)]">Contact Us</h3>
          <ul className="space-y-2 font-[family-name:var(--font-secondary)]">
            <li>
              <Link href={''}>Address: Jl. RSI Markandya 2, Gang Mawar, Banjar Sebali, Desa Keliki, Kecamatan Tegallalang - Bali, Indonesia</Link>
            </li>
            <li>
              <Link href={''}>E-mail: umahshantivilla@gmail.com</Link>
            </li>
            <li>
              <Link href={''}>Phone: (0361) 898 9127</Link>
            </li>
          </ul>
        </div>
        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-[family-name:var(--font-primary)]">Social Links</h3>
          <ul className="flex justify-start items-center gap-x-4 font-[family-name:var(--font-secondary)]">
            <li>
              <Link href={''}><FaFacebookF /></Link>
            </li>
            <li>
              <Link href={''}><FaInstagram /></Link>
            </li>
            <li>
              <Link href={''}><IoLogoTiktok /></Link>
            </li>
            <li>
              <Link href={''}><FaTwitter /></Link>
            </li>
          </ul>
        </div>
      </div>
      {/* CopyRight */}
      <div className="border-t border-background py-4">
        <p className="text-sm md:text-base font-[family-name:var(--font-secondary)] text-center text-background">
          Copyright © 2024 umahshantivilla All Right Reserved. Designed By Hammad Shamir
        </p>
      </div>
    </footer>
  )
};

export default Footer;
