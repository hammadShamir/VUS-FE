import React from 'react'
import BookingForm from './BookingForm'

const BookingSection = () => {
    return (
        <section className='relative py-8 px-6 md:px-0'>
            <div className='max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2'>
                <div></div>
                <BookingForm />
            </div>
        </section>
    )
}

export default BookingSection
