import Image from 'next/image'
import React from 'react'
import {
    MdSpa,
    MdKitchen,
    MdDirectionsBike,
    MdHiking,
    MdDining,
    MdDryCleaning,
    MdIron,
    MdEventSeat,
    MdOutlineCleaningServices,
    MdSecurity,
    MdLocalGroceryStore,
    MdAirportShuttle
} from 'react-icons/md'
import Container from './common/Container'

const Facilities = () => {
    const facilities = [
        { icon: MdSpa, text: "Spa & Wellness Packages" },
        { icon: MdKitchen, text: "Fully Equipped Kitchen" },
        { icon: MdDirectionsBike, text: "Bicycle Rental" },
        { icon: MdHiking, text: "Hiking Activities" },
        { icon: MdDining, text: "Dining Experiences" },
        { icon: MdDryCleaning, text: "Dry Cleaning Service" },
        { icon: MdIron, text: "Ironing Service" },
        { icon: MdEventSeat, text: "Sun Deck" },
        { icon: MdOutlineCleaningServices, text: "Daily Housekeeping" },
        { icon: MdSecurity, text: "24-Hour Security" },
        { icon: MdLocalGroceryStore, text: "Grocery Deliveries" },
        { icon: MdAirportShuttle, text: "Shuttle Service" },
        { icon: MdSecurity, text: "Safe & Secure Environment" },
        { icon: MdOutlineCleaningServices, text: "Babysitting/Child Services" }
    ]

    return (
        <section className="bg-primary bg-[url('/assets/img/bubble-bg.png')]">
            <Container style='py-8'>
                <div className='flex flex-col md:flex-row md:justify-between gap-x-12 gap-y-6'>
                    {/* Left Column */}
                    <div className="w-full lg:w-[60%] flex flex-col justify-center space-y-8">
                        <div className="space-y-4" data-aos="fade-right">
                            <h2 className="text-background font-[family-name:var(--font-secondary)]">FACILITIES</h2>
                            <h1 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-background md:text-4xl">
                                Luxury Facilities & Services
                            </h1>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {facilities.map((facility, index) => (
                                <div key={index} className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay={index * 100}>
                                    <facility.icon className="text-background w-6 h-6" />
                                    <span className="text-background font-[family-name:var(--font-secondary)]">{facility.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="relative w-full lg:w-[40%]">
                        <div data-aos="zoom-in-left" data-aos-delay="1000" className="aspect-[4/2] md:aspect-[4/5] md:rounded-3xl overflow-hidden">
                            <Image
                                src="/assets/img/Pool/img-3.png"
                                alt="Luxury Room Interior"
                                width={600}
                                height={800}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Facilities
