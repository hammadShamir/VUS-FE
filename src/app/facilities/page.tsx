import Banner from '@/components/common/Banner'
import CallForAction from '@/components/common/call-for-action'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header/Header'
import Rooms from '@/components/Rooms'
import FacilitiesSection from '@/components/Facilities'

const page = () => {
    return (
        <>
            <Header />
            <Banner bgImg="/assets/img/Lawn/img-1.jpg"
                title="Facilities"
                para="Experience the finest blend of nature and luxury with amenities designed to make your stay unforgettable." />
            <Rooms />
            <FacilitiesSection />
            <CallForAction />
            <Footer />
        </>
    )
}

export default page

