import { RoomDescriptionProps } from '@/interfaces'
import Image from 'next/image'
import Container from './common/Container'

const RoomDescription: React.FC<RoomDescriptionProps> = (props) => {
    return (
        <section className={`bg-${props.bgColor} py-8 px-6 md:px-0`}>
            <Container style={`flex flex-col ${props.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}  gap-x-12 gap-y-4 `}>
                <div className="relative w-full lg:w-[40%]">
                    <div className="aspect-[4/2] md:aspect-[4/5] md:rounded-3xl overflow-hidden">
                        <Image
                            src={props.imageSrc}
                            alt={props.title}
                            width={600}
                            height={800}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
                <div className="md:p-6 lg:w-[60%] flex flex-col justify-center gap-y-6">
                    <h2 className="font-[family-name:var(--font-primary)] text-3xl font-bold tracking-tight text-primary md:text-4xl">{props.title}</h2>
                    <p className=" text-foreground font-[family-name:var(--font-secondary)]">{props.description}</p>
                    <div className="grid grid-cols-2 gap-4 md:w-3/4">
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
            </Container>
        </section>
    )
}

export default RoomDescription