import Image from "next/image";

export default function IntroSection() {
  return (
    <section className="max-w-screen-xl mx-auto py-12 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left side - Main content */}
        <div className="lg:w-2/3 space-y-6">
          <h2 className="text-sm font-[family-name:var(--font-secondary)] uppercase tracking-wider text-foreground">
            INTRODUCTION
          </h2>
          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-primary)] text-primary">
            Enjoy Serene togetherness with Ultimate privacy, a private pool, and
            a spacious deck
          </h1>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src="/assets/img/Lawn/img-1.jpg"
              alt="Spacious villa interior with a view"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* Right side - Image and description */}
        <div className="lg:w-1/3 space-y-6">
          <div className="relative overflow-hidden aspect-square h-[200px] sm:h-[400px] w-full lg:h-[500px] rounded-xl">
            <Image
              src="/assets/img/front/img-1.png"
              alt="Luxurious bedroom with white drapes"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <p className="text-foreground font-[family-name:var(--font-secondary)]">
            Getting Its Name From Balinese And Sanskrit Words Which Means 'a
            Peaceful Home', Umah Shanti Villa Is A PRIVATE VILLA Designed To Be
            A Peaceful, Romantic, Relaxing And Rejuvenating Place For You.
          </p>
        </div>
      </div>
    </section>
  );
}
