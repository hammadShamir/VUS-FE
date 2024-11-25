import Banner from "@/components/common/Banner";
import CallForAction from "@/components/common/call-for-action";
import Testimonials from "@/components/Testimonials";
import IntroSection from "@/components/Intro";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import RoomsExplore from "@/components/RoomExplore";

export default function Home() {
  return (
    <>
      <Header />
      <Banner
        bgImg="/assets/img/banners/banner-home.png"
        title="A Peaceful Home Awaits at Umah Shanti Villas"
        para="Find Your Oasis of Calm in Our Luxurious Accommodations"
        parameters
      />
      <IntroSection />
      <RoomsExplore />
      <Testimonials />
      <CallForAction />
      <Footer />
    </>
  );
}
