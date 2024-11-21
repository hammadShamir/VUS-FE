import Footer from '@/common/Footer'
import Header from '@/common/Header'
import Banner from '@/components/Banner'
import CallForAction from '@/components/call-for-action'
import React from 'react'

const page = () => {
    return (
        <>
            <Header />
            <Banner
                bgImg="/assets/img/banners/banner-contact.png"
                title="Booking"
                para="Find Your Oasis of Calm in Our Luxurious Accommodations"
            />
            <CallForAction />
            <Footer />
        </>
    )
}

export default page
