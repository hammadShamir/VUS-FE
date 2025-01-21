"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { IAdminBookingTable, IBookingTable } from "@/interfaces";
import { useModal } from "@/context/Modal";
import { BookingDetailsModal } from "./modal-components/View-Booking-Modal";
import BookingStatusBadge from "./Booking-Status";

const BookingsTable: React.FC<IBookingTable> = (props) => {
  const { showModal } = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredBookings = props.bookings.filter((booking) =>
    Object.values(booking).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  const viewBooking = (booking: IAdminBookingTable) => {
    showModal(
      <BookingDetailsModal booking={booking} />,
      "View Booking",
      (result) => {
        if (result) {
          props.onUpdate();
        }
      }
    );
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search bookings..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm px-4"
      />
      <div className="rounded-md border overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Bedrooms</TableHead>
                <TableHead>Adults</TableHead>
                <TableHead>Children</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.error ? (
                <span>Error</span>
              ) : props.loading ? (
                <span>Loading...</span>
              ) : !currentBookings.length ? (
                <TableRow>
                  <TableCell className="font-medium" colSpan={12}>
                    <h3 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-primary md:text-4xl text-center w-full">
                      No Booking Available
                    </h3>
                  </TableCell>
                </TableRow>
              ) : (
                currentBookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell className="font-medium">
                      B{booking._id.slice(0, 6)}
                    </TableCell>
                    <TableCell>{booking.userId?.fullName}</TableCell>
                    <TableCell>{booking.userId?.email}</TableCell>
                    <TableCell>{booking.userId?.phone}</TableCell>
                    <TableCell>{booking.rooms}</TableCell>
                    <TableCell>{booking.adults}</TableCell>
                    <TableCell>{booking.children}</TableCell>
                    <TableCell>${booking.amount}</TableCell>
                    <TableCell>{formatDate(booking.checkIn)}</TableCell>
                    <TableCell>{formatDate(booking.checkOut)}</TableCell>
                    <TableCell>
                      <BookingStatusBadge status={booking.status} />
                    </TableCell>
                    <TableCell className="text-right flex items-center">
                      <Eye onClick={() => viewBooking(booking)} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BookingsTable;
