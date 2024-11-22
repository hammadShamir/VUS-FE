import { FaKey, FaSuitcase, FaSprayCan } from 'react-icons/fa';

const roomData = [
    {
        title: "Grand Deluxe Garden view Room",
        description: "Getting its name from Balinese and Sanskrit words which means 'a Peaceful Home', Umah Shanti Villa is a PRIVATE VILLA designed to be a peaceful, romantic, relaxing and rejuvenating place for you as a couple or having fun with friends. ",
        imageSrc: "/assets/img/Rooms/img-10.png",
        imagePosition: 'left' as const,
        bgColor: 'background',
        amenities: [
            { icon: FaKey, label: "Smart Key", description: "Smart Room Entry" },
            { icon: FaSuitcase, label: "Store Luggage", description: "Short-Term Storage" },
            { icon: FaSuitcase, label: "Room Service", description: "24/7 Room Service" },
            { icon: FaSprayCan, label: "Disinfection", description: "Regular Sanitization" },
        ]
    },
    {
        title: "Grand Deluxe Garden view Room",
        description: "Experience Tranquility: Our Grand Deluxe Garden View Room Combines Elegant Decor with Panoramic Garden Views, Creating a Peaceful Haven for Your Stay.",
        imageSrc: "/assets/img/Rooms/img-8.png",
        imagePosition: 'right' as const,
        bgColor: 'secondary',
        amenities: [
            { icon: FaKey, label: "Smart Key", description: "Smart Room Entry" },
            { icon: FaSuitcase, label: "Store Luggage", description: "Short-Term Storage" },
            { icon: FaSuitcase, label: "Room Service", description: "24/7 Room Service" },
            { icon: FaSprayCan, label: "Disinfection", description: "Regular Sanitization" },
        ]
    },
    {
        title: "Grand Deluxe Garden view Room",
        description: "Luxurious Comfort Meets Nature: Enjoy Our Grand Deluxe Garden View Room, Where Sophisticated Design Blends Seamlessly with Lush Garden Scenery for a Truly Relaxing Experience.",
        imageSrc: "/assets/img/Rooms/img-11.png",
        imagePosition: 'left' as const,
        bgColor: 'background',
        amenities: [
            { icon: FaKey, label: "Smart Key", description: "Smart Room Entry" },
            { icon: FaSuitcase, label: "Store Luggage", description: "Short-Term Storage" },
            { icon: FaSuitcase, label: "Room Service", description: "24/7 Room Service" },
            { icon: FaSprayCan, label: "Disinfection", description: "Regular Sanitization" },
        ]
    }
]

export default roomData;