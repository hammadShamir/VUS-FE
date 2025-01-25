import Banner from "@/components/common/Banner";
import CallForAction from "@/components/common/call-for-action";
import Testimonials from "@/components/Testimonials";
import IntroSection from "@/components/Intro";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header/Header";
import RoomsExplore from "@/components/RoomExplore";
import PromoBanner from "@/components/PromoBanner";
// import EmbeddedPost from "@/components/EmbeddedPost";

export default function Home() {
  return (
    <>
      <Header />
      <Banner
        bgImg="/assets/img/banners/banner-home.png"
        title="A Peaceful Home Awaits at Umah Shanti Villas"
        para="Discover unparalleled comfort and tranquility in our luxurious Accommodation, where every moment feels like a dream."
        parameters
      />
      <IntroSection />
      <PromoBanner />
      <RoomsExplore />
      <Testimonials />
      {/* <EmbeddedPost /> */}
      <CallForAction />
      <Footer />
    </>
  );
}
