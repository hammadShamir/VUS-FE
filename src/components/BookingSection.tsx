'use client';
import React from 'react';
import BookingForm from './BookingForm';
import CustomCalender from './ui/Custom-calendar';
import { axiosService } from '@/services/axios';

const BookingSection = () => {
  const [bookedSlots, setBookedSlots] = React.useState<Date[]>([]);
    React.useEffect(() => {
        fetchBookedSlots();
    }, []);

    const fetchBookedSlots = async () => {
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0); 
        const response = await axiosService.get('/slots/booked-slots', {
            params: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            },
        });
        if (response.data.length) {
            setBookedSlots(formatBookedSlots(response.data));
        }

    }

    const formatBookedSlots = (bookedSlots: { date: string, booked: boolean }[]) => {
        return bookedSlots.map((slots) => new Date(slots.date));
    }
    return (
        <section className='relative py-8 px-6 md:px-0'>
        <div className='max-w-screen-lg mx-auto grid gap-4 md:grid-cols-5'>

            <div className='space-y-4 md:col-span-3'>
                <CustomCalender bookedSlots={bookedSlots} />
                <CustomCalender isNext={true} bookedSlots={bookedSlots} />
            </div>

            <div className='md:col-span-2'>
                <BookingForm bookedSlots={bookedSlots} />
            </div>
        </div>
    </section>
    );
};

export default BookingSection;
