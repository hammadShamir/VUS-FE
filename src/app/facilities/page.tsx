import Banner from '@/components/Banner'
import CallForAction from '@/components/call-for-action'
import Footer from '@/common/Footer'
import Header from '@/common/Header'
import Rooms from '@/components/Rooms'
import FacilitiesSection from '@/components/Facilities'

const page = () => {
    return (
        <>
            <Header />
            <Banner bgImg="/assets/img/banners/banner-facilities.png"
                title="Facilities"
                para="Find Your Oasis of Calm in Our Luxurious Accommodations" />
            <Rooms />
            <FacilitiesSection />
            <CallForAction />
            <Footer />
        </>
    )
}

export default page

