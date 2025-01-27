import { LucideProps } from "lucide-react";
import { SetStateAction } from "react";
import { IconType } from "react-icons";
import { IBookingUser } from "./Auth";

export interface IHamBurger {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export interface ISidebar extends IHamBurger {
  isScrolled?: boolean;
}

// ROOMS

interface Amenity {
  icon: IconType;
  label: string;
  description: string;
}

export interface RoomDescriptionProps {
  title: string;
  description: string;
  imageSrc: string;
  imagePosition?: "left" | "right";
  bgColor: string;
  amenities: Amenity[];
}

export interface IDatePicker {
  placeholder: string;
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
  amount: number;
  createdAt: string;
  __v: number;
}

export enum BookingStatus {
  pending = "Pending",
  approved = "Approved",
  rejected = "Rejected",
  complete = "Completed",
  cancelled = "Cancelled",
  active = "Active",
  inactive = "Inactive",
}
export enum status {
  active = "Active",
  inactive = "Inactive",
}

export interface IAdminBookingTable {
  _id: string;
  userName: string;
  userEmail: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  rooms: string;
  adults: string;
  children: number;
  amount: number;
  status: BookingStatus;
  userId: IBookingUser;
}
export interface IAdminManagementTable {
  _id: string;
  uuid?: string;
  email: string;
  fullName: string;
  phone: string;
  isActive?: boolean;
}
export interface IRoomsManagementTable {
  _id?: string;
  label: string;
  roomsCount: number | string;
  adults: number;
  children: number;
  price: number;
}
export interface IAdminReviewsTable {
  _id: string;
  author: string;
  authorPic: string;
  rating: number;
  isActive: boolean;
  description: string;
  date: string | Date;
  isSubmitted?: boolean;
}

export interface IAdminPostsTable {
  _id: string;
  caption: string;
  imgUrl: string;
  isActive?: boolean;
  date?: string | Date;
  postId: string;
  isSubmitted?: boolean;
}

export interface IBookingTable {
  bookings: IAdminBookingTable[];
  loading: boolean;
  error: boolean;
  onUpdate: () => void;
}

export interface IAdminManagementMainTable {
  admins: IAdminManagementTable[];
  loading: boolean;
  error: boolean;
  onUpdate: () => void;
}

export interface IAdminRoomsManagementTable {
  rooms: IRoomsManagementTable[];
  loading: boolean;
  error: boolean;
  onUpdate: () => void;
}

export interface IReviewTable {
  reviews: IAdminReviewsTable[];
  onUpdate: () => void;
  loading: boolean;
  error: boolean;
}
export interface IPostsTable {
  instagramPosts: IAdminPostsTable[];
  onUpdate: () => void;
  loading: boolean;
  error: boolean;
}
export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
  SUB_ADMIN = "sub-admin",
}
export interface DashboardMenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<LucideProps>;
}

export type NotificationStatus = "success" | "danger" | "booking" | "default";
