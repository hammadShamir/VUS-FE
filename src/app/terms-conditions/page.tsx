import Banner from "@/components/common/Banner"
import CallForAction from "@/components/common/call-for-action"
import Container from "@/components/common/Container"
import Footer from "@/components/common/Footer"
import Header from "@/components/common/Header/Header"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"

const Page = () => {
    return (
        <>
            <Header />
            <Banner
                bgImg="/assets/img/Sanitary/img-3.png"
                title="TERMS & CONDITIONS"
                para="Understand our terms and conditions to ensure a seamless booking and stay experience."
            />
            <Container style="py-12">
                <Card className="mx-auto border-0">
                    <CardContent className="space-y-8">
                        <section>
                            <h3 className="text-2xl font-semibold text-primary mb-3">1. Booking & Payment</h3>
                            <p className="text-gray-600">
                                All bookings must be made in advance, and payment should be completed at the time of booking. Accepted
                                payment methods include credit/debit cards and bank transfers.
                            </p>
                        </section>

                        <hr className="border-t border-gray-200" />

                        <section>
                            <h3 className="text-2xl font-semibold text-primary mb-3">2. Cancellation & Refund</h3>
                            <p className="text-gray-600">
                                Cancellations are subject to our refund policy. Refunds will be processed based on the time of
                                cancellation relative to the booking date.
                            </p>
                        </section>

                        <hr className="border-t border-gray-200" />

                        <section>
                            <h3 className="text-2xl font-semibold text-primary mb-3">3. Guest Responsibilities</h3>
                            <p className="text-gray-600">
                                Guests are expected to maintain the property in good condition and adhere to all house rules. Any
                                damages caused will be charged accordingly.
                            </p>
                        </section>

                        <hr className="border-t border-gray-200" />

                        <section>
                            <h3 className="text-2xl font-semibold text-primary mb-3">4. Privacy & Data Protection</h3>
                            <p className="text-gray-600">
                                We respect your privacy and ensure that personal data is securely stored and used solely for
                                booking-related purposes.
                            </p>
                        </section>

                        <hr className="border-t border-gray-200" />

                        <section>
                            <h3 className="text-2xl font-semibold text-primary mb-3">5. Contact Us</h3>
                            <p className="text-gray-600 mb-4">For any inquiries or support, please reach out to us:</p>
                            <div className="space-y-2">
                                <div className="flex items-center text-gray-600">
                                    <Mail className="w-5 h-5 mr-2 text-primary" />
                                    <span>
                                        <strong>Email</strong>: support@example.com
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Phone className="w-5 h-5 mr-2 text-primary" />
                                    <span>
                                        <strong>Phone</strong>: +1 234 567 890
                                    </span>
                                </div>
                            </div>
                        </section>

                        <hr className="border-t border-gray-200" />

                        <p className="text-center text-gray-600 italic">
                            By proceeding with your booking, you agree to abide by our terms and conditions.
                        </p>
                    </CardContent>
                </Card>
            </Container>
            <CallForAction />
            <Footer />
        </>
    )
}

export default Page

