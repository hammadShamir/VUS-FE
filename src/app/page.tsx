import Banner from "@/components/Banner";
import CallForAction from "@/components/call-for-action";
import Testimonials from "@/components/Testimonials";
import IntroSection from "@/components/Intro";
import Footer from "@/common/Footer";
import Header from "@/common/Header";
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
