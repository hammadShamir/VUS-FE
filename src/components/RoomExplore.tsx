import Image from "next/image"

export default function RoomsSection() {
    return (
        <section className="max-w-screen-lg mx-auto  bg-[url('/subtle-stripes.png')] py-8 px-6 md:px-0">
            <div className="container">
                <div className="flex flex-col lg:flex-row lg:items-stretch">
                    {/* Left side - Main Image (30% width) */}
                    <div className="relative mb-8 h-[200px] sm:h-[400px] w-full overflow-hidden rounded-md lg:mb-0 lg:h-auto lg:w-[40%]">
                        <Image
                            src="/assets/img/Rooms/img-10.png"
                            alt="Luxurious bedroom with white drapes"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Right side - Content (70% width) */}
                    <div className="flex flex-col justify-between lg:w-[60%] lg:pl-12">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="font-[family-name:var(--font-secondary)] text-sm font-medium uppercase tracking-wider text-foreground">
                                    ROOMS
                                </h2>
                                <h3 className="font-[family-name:var(--font-primary)] text-3xl font-bold tracking-tight text-primary md:text-4xl">
                                    Enjoy a peaceful, romantic, and relaxing experience
                                </h3>
                            </div>

                            {/* Small Images Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                                    <Image
                                        src="/assets/img/Rooms/img-9.png"
                                        alt="Peaceful bedroom view"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                                    <Image
                                        src="/assets/img/Rooms/img-8.png"
                                        alt="Romantic bedroom setting"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <p className="text-foreground font-[family-name:var(--font-secondary)]">
                                    Getting Its Name From Balinese And Sanskrit Words Which Means &apos;a Peaceful Home&apos;,
                                    Umah Shanti Villa Is A PRIVATE VILLA Designed To Be A Peaceful, Romantic, Relaxing And
                                    Rejuvenating Place For You.
                                </p>
                                <button
                                    className="text-base rounded-md bg-background border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-background"
                                >
                                    EXPLORE ROOMS
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

