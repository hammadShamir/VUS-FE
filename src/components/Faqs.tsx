import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "What Is The Check-In And Check-Out Time?",
        answer: "Most Hotels Have A Standard Check-In Time Around 2:00 PM To 3:00 PM And Check-Out Time Between 11:00 AM And 12:00 PM. However, It Varies By Hotel, So It's Best To Confirm At The Time Of Booking."
    },
    {
        question: "What Is The Cancellation Policy?",
        answer: "Our standard cancellation policy allows free cancellation up to 24 hours before check-in. Cancellations made after this period may be subject to a fee equivalent to one night's stay."
    },
    {
        question: "Are There Any Hidden Fees Associated With The Room Rate?",
        answer: "All mandatory fees and taxes are included in the displayed room rate. Additional charges may apply for optional services or amenities used during your stay."
    },
    {
        question: "Is Wi-Fi Included In The Room Rate?",
        answer: "Yes, complimentary high-speed Wi-Fi is included with all room bookings and is available throughout the hotel premises."
    },
    {
        question: "Are Pets Allowed In The Hotel?",
        answer: "Yes, we are a pet-friendly hotel. However, we recommend informing the hotel in advance to ensure availability of pet-specific accommodations."
    },
    {
        question: "Is Parking Available At The Hotel?",
        answer: "Yes, complimentary parking is available for all guests. Please contact the front desk for additional information regarding parking spaces."
    }
];


export default function FAQs() {
    return (
        <section className="w-full md:w-3/5 relative">
            <div className="container mx-auto max-w-3xl">
                <h2 data-aos="fade-right" className="mb-4 md:mb-8 text-3xl font-bold tracking-tight text-primary md:text-4xl font-[family-name:var(--font-primary)]">
                    FAQ&apos;s Need Help?
                </h2>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            key={index}
                            value={`item-${index}`}
                            className="border-b px-4 data-[state=open]:border-l-4 data-[state=open]:border-l-primary "
                        >
                            <AccordionTrigger className="text-left text-base font-semibold text-primary hover:no-underline md:text-lg [&[data-state=open]>svg]:rotate-45 font-[family-name:var(--font-primary)]">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-foreground font-[family-name:var(--font-secondary)]">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}

