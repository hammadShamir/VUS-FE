import Banner from "@/components/Banner";
import CallForAction from "@/components/call-for-action";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Testimonials from "@/components/Testimonials";

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
      <CallForAction />
      <Testimonials />
      <Footer />
    </>
  );
}
