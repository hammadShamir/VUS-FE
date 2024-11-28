import React from 'react'
import FAQs from './Faqs'
import ContactForm from './Contact-form'

const ContactSection = () => {
    return (
        <section className='relative py-4 md:py-8 px-3 md:px-6 md:px-0'>
            <div className='max-w-screen-xl mx-auto flex flex-col md:flex-row md:justify-between gap-x-8 gap-y-6'>
                <FAQs />
                <ContactForm />
            </div>
        </section>
    )
}

export default ContactSection
