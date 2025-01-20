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
                        <h3 className="text-background font-[family-name:var(--font-secondary)]">DAILY SANIFICATION</h3>
                        <h2 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-background md:text-4xl">
                            Room Service
                        </h2>
                        <p className='text-background font-[family-name:var(--font-secondary)] text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porttitor tellus vel mauris scelerisque accumsan. Maecenas quis nunc sed sapien dignissim pulvinar. Se d at gravida ligula, eget hendrerit nisi. Pellentesque at congue mauris. posuere finibus risus. </p>
                        <div>
                            <Link href={'/booking'} className="z-10">
                                <Button variant='outline'>
                                    Book Now
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
