import Image from 'next/image'
import React from 'react'
import {
    MdAccessible,
    MdAcUnit,
    MdBalcony,
    MdCoffee,
    MdDesk,
    MdHotel,
    MdSmokeFree,
    MdBathtub,
    MdBathroom
} from 'react-icons/md'
import Container from './common/Container'
const Facilities = () => {
    const facilities = [
        { icon: MdAccessible, text: "Accessible Room" },
        { icon: MdAcUnit, text: "Air Conditioning" },
        { icon: MdBalcony, text: "Balcony" },
        { icon: MdCoffee, text: "Coffee / Tea Facilities" },
        { icon: MdDesk, text: "Desk" },
        { icon: MdHotel, text: "Extra Bed Allowed" },
        { icon: MdSmokeFree, text: "Non Smoking" },
        { icon: MdBathtub, text: "Bathtub & Separate Shower" },
        { icon: MdBathroom, text: "Double Sink" },
        { icon: MdBathroom, text: "Walk-In Closet" }
    ]
    return (
        <section className="bg-primary bg-[url('/assets/img/bubble-bg.png')]">
            <Container style='py-8'>
                <div className='flex flex-col md:flex-row md:justify-between gap-x-12 gap-y-6'>
                    {/* Left Column */}
                    <div className="w-full lg:w-[60%] flex flex-col justify-center space-y-8">
                        <div className="space-y-4 " data-aos="fade-right">
                            <h2 className="text-background font-[family-name:var(--font-secondary)]">FACILITIES</h2>
                            <h1 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-background md:text-4xl">
                                Elegantly Blending traditional and Modern Decor, with Stunning views
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
                                src="/assets/img/lawn/img-3.png"
                                alt="Luxury Room Interior"
                                width={600}
                                height={800}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section >
    )
}

export default Facilities
