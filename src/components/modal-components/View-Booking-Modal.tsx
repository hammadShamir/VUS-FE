"use client";

import { Button } from "@/components/ui/button";
import {
  CalendarCheck,
  CalendarX,
  Home,
  Users,
  CreditCard,
} from "lucide-react";
import BookingStatusBadge from "../Booking-Status";
import { BookingStatus, IAdminBookingTable } from "@/interfaces";
import { axiosService } from "@/services/axios";
import { useModal } from "@/context/Modal";

export function BookingDetailsModal({
  booking,
}: {
  booking: IAdminBookingTable;
}) {
  const { hideModal } = useModal();
  const handleUpdateBooking = async (status: BookingStatus) => {
    axiosService.put(`update-booking/${booking._id}`, {
      status,
    });
    hideModal(true);
  };

  return (
    <div className="space-y-6 my-6">
      {/* Guest Information */}
      <div>
        <h3 className="font-semibold text-lg">{booking.userName}</h3>
        <p className="text-sm text-muted-foreground">{booking.userEmail}</p>
        <p className="text-sm text-muted-foreground">{booking.phone}</p>
      </div>

      {/* Booking Information */}
      <div className="grid grid-cols-2 gap-4 px-2">
        {/* Rooms */}
        <div>
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-sm">Rooms</span>
          </div>
          <p className="text-sm mt-1">
            {booking.rooms} {+booking.rooms > 1 ? "Rooms" : "Room"}
          </p>
        </div>

        {/* Guests */}
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-sm">Guests</span>
          </div>
          <p className="text-sm mt-1">
            {booking.adults} Adults, {booking.children} Children
          </p>
        </div>

        {/* Check In */}
        <div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-green-600" />
            <span className="font-medium text-sm">Check In</span>
          </div>
          <p className="text-sm mt-1">{booking.checkIn}</p>
        </div>

        {/* Check Out */}
        <div>
          <div className="flex items-center gap-2">
            <CalendarX className="w-5 h-5 text-red-600" />
            <span className="font-medium text-sm">Check Out</span>
          </div>
          <p className="text-sm mt-1">{booking.checkOut}</p>
        </div>

        {/* Paid Amount */}
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-sm">Paid Amount</span>
          </div>
          <p className="text-sm mt-1">${booking.amount || "0"}</p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Status</span>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>
        {booking.status === BookingStatus.pending && (
          <div className="col-span-2 flex justify-end self-end">
            <Button
              onClick={() => {
                handleUpdateBooking(BookingStatus.approved);
              }}
              className="bg-green-600 text-background mr-2"
              variant={"outline"}
            >
              Approve
            </Button>
            <Button
              onClick={() => {
                handleUpdateBooking(BookingStatus.rejected);
              }}
              className="bg-red-600 text-background"
              variant={"outline"}
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
