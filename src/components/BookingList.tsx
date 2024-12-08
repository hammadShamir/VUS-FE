import Image from "next/image";
import { Card, CardContent } from "./ui/card"; // Ensure these are imported
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils"; // Replace with your actual utility function

const SAMPLE_BOOKINGS = [
    {
        id: "0091",
        status: "pending" as const,
        amount: 40,
        bookingDate: "27/10/2024",
        numberOfRooms: 2,
        imageUrl: "/assets/img/lawn/img-3.png",
    },
    {
        id: "0092",
        status: "upcoming" as const,
        amount: 50,
        bookingDate: "28/10/2024",
        numberOfRooms: 1,
        imageUrl: "/assets/img/lawn/img-3.png",
    },
    {
        id: "0093",
        status: "canceled" as const,
        amount: 30,
        bookingDate: "29/10/2024",
        numberOfRooms: 3,
        imageUrl: "/assets/img/lawn/img-3.png",
    },
    {
        id: "0093",
        status: "canceled" as const,
        amount: 30,
        bookingDate: "29/10/2024",
        numberOfRooms: 3,
        imageUrl: "/assets/img/lawn/img-3.png",
    },
    {
        id: "0093",
        status: "canceled" as const,
        amount: 30,
        bookingDate: "29/10/2024",
        numberOfRooms: 3,
        imageUrl: "/assets/img/lawn/img-3.png",
    },
    {
        id: "0093",
        status: "canceled" as const,
        amount: 30,
        bookingDate: "29/10/2024",
        numberOfRooms: 3,
        imageUrl: "/assets/img/lawn/img-3.png",
    },
    {
        id: "0093",
        status: "canceled" as const,
        amount: 30,
        bookingDate: "29/10/2024",
        numberOfRooms: 3,
        imageUrl: "/assets/img/lawn/img-3.png",
    },
];

const statusStyles: Record<string, string> = {
    pending: "text-yellow-500",
    upcoming: "text-green-500",
    canceled: "text-red-500",
};

const statusText: Record<string, string> = {
    pending: "Pending",
    upcoming: "Upcoming",
    canceled: "Canceled",
};

export function BookingsList() {
    return (
        <div className="space-y-6 w-full p-4 md:ms-64 mt-14 mb-14 md:mb-0">
            <h1 className="text-2xl font-bold">My Bookings:</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SAMPLE_BOOKINGS.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden">
                        <div className="relative aspect-[5/3] w-full">
                            <Image
                                src={booking.imageUrl}
                                alt={`Booking ${booking.id}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardContent className="p-4 bg-primary h-full">
                            <div className="flex items-center justify-between mb-4">
                                <div className="font-medium">#{booking.id}</div>
                                <Badge
                                    variant="secondary"
                                    className={cn(statusStyles[booking.status])}
                                >
                                    {statusText[booking.status]}
                                </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Amount</span>
                                    <span className="font-medium">${booking.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Booking Date</span>
                                    <span className="font-medium">{booking.bookingDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">No Of Rooms</span>
                                    <span className="font-medium">{booking.numberOfRooms}</span>
                                </div>
                            </div>
                            {booking.status !== "canceled" && (
                                <Button
                                    variant="outline"
                                    className="w-full mt-4"
                                    onClick={() => {
                                        console.log(`Canceling booking ${booking.id}`);
                                    }}
                                >
                                    CANCEL BOOKING
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
