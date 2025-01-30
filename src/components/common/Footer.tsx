import Image from "next/image";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import Container from "./Container";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  return (
    <footer className="bg-primary bg-[url('/assets/img/bubble-bg.png')]">
      <Container style="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 py-6 md:py-12 text-background gap-6 lg:gap-12">
        {/* <div className="max-w-screen-lg mx-auto px-6 2xl:px-0 "> */}
        {/* Intro */}
        <div data-aos="fade-left" className="lg:col-span-2 space-y-4">
          <Image
            src={"/assets/img/logo.png"}
            alt="Logo"
            height={70}
            width={70}
            className=""
          />
          <p className="text-base font-bold font-[family-name:var(--font-secondary)]">
            Welcome to Umah Shanti, where luxury meets serenity. Nestled in the
            heart of Bali, our villa offers a tranquil escape surrounded by
            nature&apos;s beauty and modern comfort.{" "}
          </p>
        </div>

        {/* Pages Links */}
        <div className="space-y-4" data-aos="fade-left" data-aos-delay="500">
          <h3 className="text-xl font-bold font-[family-name:var(--font-primary)]">
            Page
          </h3>
          <ul className="w-full flex justify-start items-center gap-2 md:block md:space-y-2 font-[family-name:var(--font-secondary)]">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/facilities"}>Facilities</Link>
            </li>
            <li>
              <Link href={"/my-booking"}>My Booking</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact Us</Link>
            </li>
          </ul>
        </div>
        {/* Contacts */}
        <div
          className="md:col-span-2 space-y-4"
          data-aos="fade-left"
          data-aos-delay="800"
        >
          <h3 className="text-xl font-bold font-[family-name:var(--font-primary)]">
            Contact Us
          </h3>
          <ul className="space-y-2 font-[family-name:var(--font-secondary)]">
            <li>
              <Link href={"https://maps.app.goo.gl/mVPNKym7BSmS2PP28"}>
                {" "}
                Jl. RSI Markandya 2, Gang Mawar, Banjar Sebali, Desa Keliki,
                Kecamatan Tegallalang - Bali, Indonesia
              </Link>
            </li>
            <li>
              <Link href={"mailto:umahshantivilla@gmail.com"}>
                E-mail: umahshantivilla@gmail.com
              </Link>
            </li>
            <li>
              <Link href={"tel:+623618989127"}>Phone: +62 361 898 9127</Link>
            </li>
          </ul>
        </div>
        {/* Social Links */}
        <div className="space-y-4" data-aos="fade-left" data-aos-delay="1000">
          <h3 className="text-xl font-bold font-[family-name:var(--font-primary)]">
            Social Links
          </h3>
          <ul className="flex justify-start items-center gap-x-4 font-[family-name:var(--font-secondary)]">
            <li>
              <Link href={""}>
                <FaFacebookF />
              </Link>
            </li>
            <li>
              <Link href={""}>
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link href={""}>
                <IoLogoTiktok />
              </Link>
            </li>
            <li>
              <Link href={""}>
                <FaTwitter />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      {/* CopyRight */}
      <div className="border-t border-background py-4">
        <div className="text-sm md:text-base font-[family-name:var(--font-secondary)] text-center text-background">
          Copyright © {previousYear}-{currentYear} Umah Shanti. All Rights
          Reserved. Villa managed by Red Lotus.
          <p className="text-sm md:text-base font-[family-name:var(--font-secondary)] text-center text-background">
            Designed by{" "}
            <a
              href="mailto:developerhammad64@gmail.com"
              className="underline hover:text-secondary"
            >
              Hammad Shamir
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
