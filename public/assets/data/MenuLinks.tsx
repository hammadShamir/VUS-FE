import { DashboardMenuItem } from "@/interfaces";
import {
    BookmarkIcon, BellIcon, UserIcon, BookOpen,
    Users,
    Star,
    Rss,
} from "lucide-react";
export const userDashboardMenus: DashboardMenuItem[] = [
    {
        title: "My Bookings",
        href: "/my-booking",
        icon: BookmarkIcon,
    },
    {
        title: "Notification",
        href: "/notifications",
        icon: BellIcon,
    },
    {
        title: "Profile",
        href: "/profile",
        icon: UserIcon,
    },
];

export const adminDashboardMenus: DashboardMenuItem[] = [
    {
        title: "Bookings",
        href: "/admin/bookings",
        icon: BookOpen, 
    },
    {
        title: "Admins",
        href: "/admin/admins",
        icon: Users, 
    },
    {
        title: "Reviews",
        href: "/admin/reviews",
        icon: Star,
    },
    {
        title: "Feeds",
        href: "/admin/feeds",
        icon: Rss,
    },
];