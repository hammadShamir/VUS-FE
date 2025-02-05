import { FaSwimmer, FaWifi, FaCar, FaConciergeBell, FaWind, FaUtensils, FaBath } from 'react-icons/fa';

const roomData = [
    {
        title: "Grand Deluxe Garden View Room",
        description: "Experience luxury and serenity in our Grand Deluxe Garden View Room. Featuring elegant interiors, lush garden views, and premium comfort, this room offers a peaceful retreat for relaxation.",
        imageSrc: "/assets/img/Rooms/img-10.png",
        imagePosition: 'left' as const,
        bgColor: 'background',
        amenities: [
            { icon: FaWifi, label: "Free Wifi", description: "High-speed internet in all areas" },
            { icon: FaConciergeBell, label: "Room Service", description: "24/7 personalized service" },
            { icon: FaWind, label: "Air Conditioning", description: "Climate-controlled comfort" },
            { icon: FaBath, label: "Private Bathroom", description: "Modern and fully equipped" }
        ]
    },
    {
        title: "Grand Deluxe Poolside Room",
        description: "Unwind in our Grand Deluxe Poolside Room, where elegant decor meets refreshing pool views. Perfect for those seeking comfort with easy access to the outdoor pool.",
        imageSrc: "/assets/img/Rooms/img-8.png",
        imagePosition: 'right' as const,
        bgColor: 'secondary',
        amenities: [
            { icon: FaSwimmer, label: "Outdoor Swimming Pool", description: "Infinity pool open all year" },
            { icon: FaWifi, label: "Free Wifi", description: "Seamless connectivity everywhere" },
            { icon: FaCar, label: "Free Parking", description: "Convenient on-site parking" },
            { icon: FaConciergeBell, label: "Room Service", description: "24/7 guest assistance" }
        ]
    },
    {
        title: "Grand Deluxe Suite with Terrace",
        description: "Indulge in the Grand Deluxe Suite with Terrace, boasting a spacious layout, breathtaking views, and top-tier amenities for an unforgettable stay.",
        imageSrc: "/assets/img/Rooms/img-11.png",
        imagePosition: 'left' as const,
        bgColor: 'background',
        amenities: [
            { icon: FaUtensils, label: "Breakfast", description: "Delicious morning meals included" },
            { icon: FaBath, label: "Bathtub", description: "Luxury soaking tub for relaxation" },
            { icon: FaWind, label: "Air Conditioning", description: "Ensuring ultimate comfort" },
            { icon: FaCar, label: "Airport Shuttle", description: "Convenient transport service" }
        ]
    }
]

export default roomData;