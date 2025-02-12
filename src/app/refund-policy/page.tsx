import Banner from "@/components/common/Banner"
import CallForAction from "@/components/common/call-for-action"
import Container from "@/components/common/Container"
import Footer from "@/components/common/Footer"
import Header from "@/components/common/Header/Header"

const Page = () => {
    return (
        <>
            <Header />
            <Banner
                bgImg="/assets/img/Garden/img-3.jpg"
                title="REFUND POLICY"
                para="Learn about our refund policy, including eligibility, processing time, and conditions for cancellations."
            />
            <Container style="py-12 space-y-12">
                <section className="bg-white shadow-md rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">1. Cancellation & Refund Eligibility</h3>
                    <p className="text-gray-700 mb-4">
                        We understand that plans can change. Our refund policy is designed to be fair and transparent. You may be
                        eligible for a refund based on the following conditions:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                            <svg
                                className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <span>
                                <strong>Full Refund</strong>: If cancellation is made at least 7 days before the check-in date.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <svg
                                className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                ></path>
                            </svg>
                            <span>
                                <strong>Partial Refund</strong>: If cancellation is made within 3-6 days before check-in, a 50% refund
                                will be issued.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <svg
                                className="w-6 h-6 text-red-500 mr-2 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <span>
                                <strong>No Refund</strong>: If cancellation is made within 48 hours of check-in.
                            </span>
                        </li>
                    </ul>
                </section>

                <section className="bg-white shadow-md rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">2. Refund Processing Time</h3>
                    <p className="text-gray-700 mb-4">
                        Once your cancellation request is approved, refunds will be processed within:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                            <svg
                                className="w-5 h-5 text-primary mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <span>
                                <strong>3-5 business days</strong> for payments made via credit/debit card.
                            </span>
                        </li>
                        <li className="flex items-center">
                            <svg
                                className="w-5 h-5 text-primary mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <span>
                                <strong>7-10 business days</strong> for bank transfers.
                            </span>
                        </li>
                    </ul>
                </section>

                <section className="bg-white shadow-md rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">3. Non-Refundable Bookings</h3>
                    <p className="text-gray-700">
                        Certain promotions or last-minute deals may be labeled as{" "}
                        <strong className="text-primary">non-refundable</strong>. Please check the booking details before
                        confirming your reservation.
                    </p>
                </section>

                <section className="bg-white shadow-md rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">4. Changes to Bookings</h3>
                    <p className="text-gray-700 mb-4">
                        If you wish to <strong className="text-primary">modify your booking dates</strong>, please contact us at
                        least 72 hours in advance. We will do our best to accommodate changes, subject to availability.
                    </p>
                    <p className="text-gray-700">
                        <strong className="text-primary">Date changes</strong> may be subject to price adjustments.
                    </p>
                </section>

                <section className="bg-white shadow-md rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">5. Special Circumstances</h3>
                    <p className="text-gray-700">
                        In case of unforeseen events such as medical emergencies or travel restrictions, please contact our
                        support team. We will review requests on a case-by-case basis and may offer a credit for future bookings.
                    </p>
                </section>

                <section className="bg-white shadow-md rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">6. Contact Us</h3>
                    <p className="text-gray-700 mb-4">
                        For cancellation requests or refund inquiries, please reach out to our support team:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                            <svg
                                className="w-5 h-5 text-primary mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                ></path>
                            </svg>
                            <span>
                                <strong>Email</strong>: support@example.com
                            </span>
                        </li>
                        <li className="flex items-center">
                            <svg
                                className="w-5 h-5 text-primary mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                ></path>
                            </svg>
                            <span>
                                <strong>Phone</strong>: +1 234 567 890
                            </span>
                        </li>
                    </ul>
                </section>

                <p className="text-center text-gray-700 italic">
                    We appreciate your understanding and look forward to hosting you again!
                </p>
            </Container>
            <CallForAction />
            <Footer />
        </>
    )
}

export default Page

