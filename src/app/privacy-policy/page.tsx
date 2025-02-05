import Banner from "@/components/common/Banner"
import CallForAction from "@/components/common/call-for-action"
import Container from "@/components/common/Container"
import Header from "@/components/common/Header/Header"
import Footer from "@/components/common/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Shield, Cookie, Users, Lock, FileText } from "lucide-react"

const PrivacyPolicy = () => {
    return (
        <>
            <Header />
            <Banner
                bgImg="/assets/img/Sanitary/img-2.png"
                title="Privacy Policy"
                para="Choose your dates and let us turn your vacation dreams into reality with effortless booking."
            />
            <Container style="py-12">
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center text-primary">Our Privacy Policy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-primary mb-2">
                                    1. Information We Collect
                                </h3>
                                <p className="text-gray-600">We collect personal information such as your name, email, phone number, and payment details when you make a booking or contact us.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-primary mb-2">
                                    2. How We Use Your Information
                                </h3>
                                <p className="text-gray-600">Your information is used for processing bookings, customer support, and improving our services. We do not sell your data to third parties.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-primary mb-2">
                                    3. Data Protection
                                </h3>
                                <p className="text-gray-600">We implement strict security measures to protect your personal information from unauthorized access or disclosure.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Cookie className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-primary mb-2">
                                    4. Cookies & Tracking
                                </h3>
                                <p className="text-gray-600">We use cookies to enhance user experience and analyze website traffic. You can disable cookies in your browser settings.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-primary mb-2">
                                    5. Third-Party Services
                                </h3>
                                <p className="text-gray-600">Some third-party tools, such as payment processors, may have access to necessary personal information for transaction purposes.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Lock className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-primary mb-2">
                                    6. Your Rights
                                </h3>
                                <p className="text-gray-600">You have the right to access, update, or delete your personal data. Contact us to exercise these rights.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-primary mb-2">7. Contact Us</h3>
                                <p className="text-gray-600 mb-2">For any privacy-related inquiries, please reach out to us:</p>
                                <div className="space-y-2 ml-4">
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
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Container>
            <CallForAction />
            <Footer />
        </>
    )
}

export default PrivacyPolicy

