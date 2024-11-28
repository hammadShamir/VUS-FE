import React from 'react'
import ContactLinks from './Contact-links'

const MapAndLinks = () => {
    return (
        <section className='bg-primary p-4 xl:px-0 xl:py-8'>
            <div className='max-w-screen-xl mx-auto flex flex-col md:flex-row md:justify-between gap-x-8 gap-y-6'>
                <div className="w-full md:w-3/5 ">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115348.29623011875!2d68.36690614999999!3d25.3835715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c70f6d444f3c3%3A0xc00bbc183d41e285!2sHyderabad%2C%20Sindh!5e0!3m2!1sen!2s!4v1732713392795!5m2!1sen!2s"
                        width="100%"
                        height="550"
                        loading="lazy"
                        className="rounded-2xl"
                    ></iframe>
                </div>
                <ContactLinks />
            </div>
        </section>
    )
}

export default MapAndLinks
