import { Phone, Mail, MapPin } from 'lucide-react'

export default function ContactLinks() {
    return (
        <section className="w-full md:w-2/5 px-4 py-12 md:py-16 lg:py-20">
            <div className="container mx-auto max-w-2xl">
                <h2 data-aos="fade-left" className="mb-8 text-3xl font-bold text-background md:text-4xl font-[family-name:var(--font-primary)]">
                    Contact Us
                </h2>

                <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                            <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div className="pt-1">
                            <p className="text-lg text-background font-[family-name:var(--font-secondary)]">
                                +62 361 898 9127
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="200">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                            <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div className="pt-1">
                            <a
                                href="mailto:umahshantivilla@gmail.com"
                                className="text-lg text-background font-[family-name:var(--font-secondary)]"
                            >
                                umahshantivilla@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="300">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                            <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div className="pt-1">
                            <p className="max-w-sm text-lg leading-relaxed text-background font-[family-name:var(--font-secondary)]">
                                Jl. RSI Markandya 2, Gang Mawar,
                                <br />
                                Banjar Sebali, Desa Keliki, Kecamatan
                                <br />
                                Tegallalang - Bali, Indonesia
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

