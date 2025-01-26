import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header/Header'
import Banner from '@/components/common/Banner'
import CallForAction from '@/components/common/call-for-action'
import React from 'react'
import BookingSection from '@/components/BookingSection'

const page = () => {
    return (
        <>
            <Header />
            <Banner
                bgImg="/assets/img/Rooms/img-10.png"
                title="Booking"
                para="Choose your dates and let us turn your vacation dreams into reality with effortless booking."
            />
            <BookingSection />
            <CallForAction />
            <Footer />
        </>
    )
}

export default page
