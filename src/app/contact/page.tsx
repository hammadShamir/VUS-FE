import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Banner from "@/components/common/Banner";
import CallForAction from "@/components/common/call-for-action";

import React from "react";
import ContactSection from "@/components/Contact-section";
import MapAndLinks from "@/components/map-and-links-section";

const page = () => {
  return (
    <>
      <Header />
      <Banner
        bgImg="/assets/img/banners/banner-contact.png"
        title="Booking"
        para="Find Your Oasis of Calm in Our Luxurious Accommodations"
      />
      <ContactSection />
      <MapAndLinks />
      <CallForAction />
      <Footer />
    </>
  );
};

export default page;
