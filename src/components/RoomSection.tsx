import { RoomDescriptionProps } from '@/interfaces'
import Image from 'next/image'

const RoomDescription: React.FC<RoomDescriptionProps> = (props) => {
    return (
        <section className={`bg-${props.bgColor} py-8 md:py-16`}>
            <div className={`h-[calc(100vh-20vh)] max-w-screen-lg mx-auto flex flex-col ${props.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}  gap-12 `}>
                <div className="relative rounded-lg overflow-hidden w-full lg:w-[40%]">
                    <Image
                        src={props.imageSrc}
                        alt={props.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-6 lg:w-[60%] flex flex-col justify-center gap-y-6">
                    <h2 className="font-[family-name:var(--font-primary)] text-3xl font-bold tracking-tight text-primary md:text-4xl">{props.title}</h2>
                    <p className=" text-foreground font-[family-name:var(--font-secondary)]">{props.description}</p>
                    <div className="grid grid-cols-2 gap-4 w-3/4">
                        {props.amenities.map((amenity, index) => {
                            const IconComponent = amenity.icon
                            return (
                                <div key={index} className="flex flex-col">
                                    <div className="flex items-center mb-1">
                                        <IconComponent className="w-5 h-5 text-navy-blue mr-2" />
                                        <span className="text-xl font-medium text-primary">{amenity.label}</span>
                                    </div>
                                    <span className="text-base text-foreground ml-7">{amenity.description}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RoomDescription