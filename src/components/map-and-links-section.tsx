import React from 'react'
import ContactLinks from './Contact-links'

const MapAndLinks = () => {
    return (
        <section className='bg-primary p-4 xl:px-0 xl:py-8 overflow-hidden' >
            <div className='max-w-screen-xl mx-auto flex flex-col md:flex-row md:justify-between gap-x-8 gap-y-6'>
                <div className="w-full md:w-3/5"  data-aos="fade-right">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.2546996474125!2d115.25886987495215!3d-8.474596091566257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd222b86bbaf145%3A0x2514a64ac0baf495!2sVilla%20Umah%20Shanti!5e0!3m2!1sen!2s!4v1737825723216!5m2!1sen!2s"
                        width="100%"
                        loading="lazy"
                        className="rounded-2xl h-[400px] md:h-[600px]"
                    ></iframe>
                </div>
                <ContactLinks />
            </div>
        </section>
    )
}

export default MapAndLinks
