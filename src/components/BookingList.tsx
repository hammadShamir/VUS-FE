import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { axiosService } from "@/services/axios";
import { BookingStatus, IBooking } from "@/interfaces";
import Cookies from "js-cookie";
import { Spinner } from "./ui/spinner";
import { ErrorInfoCard } from "./common/ErrorInfoCard";

const statusStyles: Record<string, string> = {
  [BookingStatus.pending]: "text-yellow-500 bg-yellow-100",
  [BookingStatus.approved]: "text-green-500 bg-green-100",
  [BookingStatus.rejected]: "text-red-500 bg-red-100",
  [BookingStatus.complete]: "text-blue-500 bg-blue-100",
  [BookingStatus.cancelled]: "text-gray-500 bg-gray-100",
};

export function BookingsList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [myBooking, setMyBooking] = useState<IBooking[]>([]);
  const token = Cookies.get("token");

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchMyBooking = async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.get("/get-booking", {
        headers: {
          Authorization: token || "",
        },
      });
      setMyBooking(response.data || []);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    axiosService.put(`update-booking/${id}`, {
      status: BookingStatus.cancelled,
    });
    fetchMyBooking();
  };

  useEffect(() => {
    fetchMyBooking();
  }, []);
  const handleRetry = () => {
    fetchMyBooking();
  };
  return (
    <div className="space-y-6 w-full p-4 md:ms-64 mt-20 mb-14 md:mb-0">
      <h1 className="text-2xl font-bold">My Bookings:</h1>
      {isLoading ? (
        <div className="w-full text-center py-8 h-[calc(100vh-170px)] flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : isError ? (
        <div className="w-full h-[calc(100vh-170px)] flex justify-center items-center">
          <ErrorInfoCard
            title="API Error"
            message="There was an error fetching data. Please try again."
            onRetry={handleRetry}
          />
        </div>
      ) : !myBooking.length ? (
        <div className="w-full text-center py-8">
          <span>No bookings available.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {myBooking.map((booking) => (
            <Card key={booking._id} className="overflow-hidden">
              <div className="relative h-44 w-full">
                <Image
                  src={"/assets/img/lawn/img-3.png"}
                  alt={`Booking ${booking._id}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4 bg-primary h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-medium">#{booking._id.slice(0, 4)}</div>
                  <Badge
                    variant="secondary"
                    className={cn(statusStyles[booking.status])}
                  >
                    {booking.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">$100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking Date</span>
                    <span className="font-medium">
                      {formatDate(booking.checkIn)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">No Of Rooms</span>
                    <span className="font-medium">{booking.rooms}</span>
                  </div>
                </div>
                {booking.status !== BookingStatus.cancelled && (
                  <Button
                    variant="outline"
                    className="w-full mt-4 hover:bg-background hover:text-primary"
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    CANCEL BOOKING
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
