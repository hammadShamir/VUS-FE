import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header/Header";
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
        bgImg="/assets/img/Garden/img-2.jpg"
        title="Contact Us"
        para="Reach out to us for inquiries, bookings, or personalized assistance to make your stay extraordinary."
      />
      <ContactSection />
      <MapAndLinks />
      <CallForAction />
      <Footer />
    </>
  );
};

export default page;
