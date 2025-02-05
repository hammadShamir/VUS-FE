import Image from 'next/image'
import React from 'react'
import Container from './common/Container'
import Link from 'next/link'
import { Button } from './ui/button'

const PromoBanner = () => {
    return (
        <section className={`relative md:h-[calc(100vh-50vh)] bg-[url('/assets/img/Rooms/img-11.png')] bg-fixed bg-no-repeat bg-bottom bg-cover`}>
            <div className='absolute top-o left-0 w-full h-full bg-black opacity-40'></div>
            <Container style='py-8 h-full flex flex-col md:flex-row md:justify-between items-center gap-x-12 gap-y-6'>
                {/* Left Column */}
                <div data-aos="fade-up" className="z-10 w-full lg:w-[50%]">
                    <div className="space-y-2 md:space-y-4">
                        <h3 className="text-background font-[family-name:var(--font-secondary)]">DAILY SANITIZATION</h3>
                        <h2 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-background md:text-4xl">
                        Exclusive Room Service Offer
                        </h2>
                        <p className='text-background font-[family-name:var(--font-secondary)] text-base'>Immerse yourself in luxury and comfort with our top-notch room service, now at an unbeatable discount! Get up to 50% OFF. Make your stay refreshing and worry-free. </p>
                        <div>
                            <Link href={'/contact'} className="z-10">
                                <Button variant='outline'>
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Right Column */}
                <div data-aos="zoom-in-left" className="relative w-full lg:w-[30%]">
                    <div className="aspect-[4/2]">
                        <Image
                            src="/assets/img/promo.png"
                            alt="Luxury Room Interior"
                            width={600}
                            height={800}
                            className="object-cover"
                        />
                    </div>
                </div>
            </Container>
        </section >
    )
}

export default PromoBanner
