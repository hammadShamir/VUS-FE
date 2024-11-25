import React from 'react'
import BookingForm from './BookingForm'
import BookingCalendar from './BookingCalendar'

const BookingSection = () => {
    return (
        <section className='relative py-8 px-6 md:px-0'>
            <div className='max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2'>
                <BookingCalendar />
                <BookingForm />
            </div>
        </section>
    )
}

export default BookingSection
