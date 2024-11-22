import Banner from '@/components/Banner'
import CallForAction from '@/components/call-for-action'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Rooms from '@/components/Rooms'

const page = () => {
    return (
        <>
            <Header />
            <Banner bgImg="/assets/img/banners/banner-facilities.png"
                title="Facilities"
                para="Find Your Oasis of Calm in Our Luxurious Accommodations" />
            <Rooms />
            <CallForAction />
            <Footer />
        </>
    )
}

export default page

