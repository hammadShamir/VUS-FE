import { SetStateAction } from "react";
import { IconType } from 'react-icons'

export interface IHamBurger {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

export interface ISidebar extends IHamBurger {
    isScrolled: boolean
}


// ROOMS

interface Amenity {
    icon: IconType
    label: string
    description: string
}

export interface RoomDescriptionProps {
    title: string
    description: string
    imageSrc: string
    imagePosition?: 'left' | 'right'
    bgColor: string
    amenities: Amenity[]
}