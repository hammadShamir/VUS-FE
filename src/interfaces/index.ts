import { LucideProps } from "lucide-react";
import { SetStateAction } from "react";
import { IconType } from 'react-icons'

export interface IHamBurger {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

export interface ISidebar extends IHamBurger {
    isScrolled?: boolean
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


export interface IDatePicker {
    placeholder: string
    selectedDate: Date | string | null;
    onDateChange: (date: Date | null) => void;
    disabledDates?: Date[];
}
export interface IBooking {
    _id: string;
    uuid: string;
    transactionId: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    adults: number;
    children: number;
    status: string;
    createdAt: string;
    __v: number;
}

export enum BookingStatus {
    pending = "Pending",
    approved = "Approved",
    rejected = "Rejected",
    complete = "Completed",
    cancelled = "Cancelled"
}
export enum UserRoles {
    USER = "user",
    ADMIN = "admin",
    SUPERADMIN = "superAdmin"
}
export interface DashboardMenuItem {
    title: string;
    href: string;
    icon: React.ComponentType<LucideProps>;
};