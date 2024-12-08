"use client"

import { cn } from "@/lib/utils"
import { BookmarkIcon, BellIcon, UserIcon, LogOutIcon } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const navItems = [
    {
        title: "My Bookings",
        href: "/mybooking",
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
    {
        title: "Logout",
        href: "/logout",
        icon: LogOutIcon,
    },
]

export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:w-64 md:flex-col md:bg-primary md:min-h-screen fixed top-[64px]">
                <div className="flex flex-col items-center p-4 border-b border-white/10 text-background">
                    <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
                        <UserIcon className="h-10 w-10 text-white/60" />
                    </div>
                    <h3>User Name</h3>
                    <span>email@gmail.com</span>
                </div>
                <div className="flex-1 space-y-1 p-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Button
                                key={item.href}
                                variant="ghost"
                                asChild
                                className={cn(
                                    "w-full justify-start gap-4 px-4 ",
                                    isActive && "bg-background text-primary",
                                    !isActive && "text-background"
                                )}
                            >
                                <Link href={item.href}>
                                    <item.icon className="h-5 w-5" />
                                    {item.title}
                                </Link>
                            </Button>
                        )
                    })}
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav className="fixed md:hidden inset-x-0 bottom-0 z-50 h-16 bg-primary border-t border-white/10">
                <div className="flex h-full items-center justify-around px-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center text-xs",
                                    isActive ? "text-white" : "text-white/60"
                                )}
                            >
                                <item.icon className="h-6 w-6 mb-1" />
                                <span>{item.title}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </>
    )
}

