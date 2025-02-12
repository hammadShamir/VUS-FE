import React from 'react'
import FAQs from './Faqs'
import ContactForm from './Contact-form'
import Container from './common/Container'

const ContactSection = () => {
    return (
        <section className='relative py-4 md:py-8 md:px-0'>
           <Container style='flex flex-col md:flex-row md:justify-between gap-x-8 gap-y-6'>
                <FAQs />
                <ContactForm />
            </Container>
        </section>
    )
}

export default ContactSection
