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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { BookingStatus, IBookingTable } from "@/interfaces";
import { cn } from "@/lib/utils";

const BookingsTable: React.FC<IBookingTable> = (props) => {
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
  const statusStyles: Record<string, string> = {
    [BookingStatus.pending]:
      "text-yellow-500 bg-yellow-100 dark:border-yellow-100",
    [BookingStatus.approved]:
      "text-green-500 bg-green-100 dark:border-green-100",
    [BookingStatus.rejected]: "text-red-500 bg-red-100 dark:border-red-100",
    [BookingStatus.complete]: "text-blue-500 bg-blue-100 dark:border-blue-100",
    [BookingStatus.cancelled]: "text-gray-500 bg-gray-100 dark:border-gray-100",
  };
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    // Implement the logic to update the booking status
    console.log(`Updating booking ${bookingId} to ${newStatus}`);
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
                <TableHead>Rooms</TableHead>
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
                      <Badge
                        variant="secondary"
                        className={cn(statusStyles[booking.status])}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              updateBookingStatus(booking._id, "Approved")
                            }
                          >
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateBookingStatus(booking._id, "Rejected")
                            }
                          >
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
