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
                bgImg="/assets/img/banners/banner-contact.png"
                title="Booking"
                para="Find Your Oasis of Calm in Our Luxurious Accommodations"
            />
            <BookingSection />
            <CallForAction />
            <Footer />
        </>
    )
}

export default page
