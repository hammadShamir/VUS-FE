"use client";
import React, { Suspense } from "react";
import BookingForm from "./BookingForm";
import { axiosService } from "@/services/axios";
import Container from "./common/Container";
import DualCalendar from "./ui/dual-custom-calender";

const BookingSection = () => {
  const [bookedSlots, setBookedSlots] = React.useState<Date[]>([]);

  const fetchBookedSlots = async () => {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 2,
      0
    );
    const response = await axiosService.get("/slots/booked-slots", {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
    if (response.data.length) {
      setBookedSlots(formatBookedSlots(response.data));
    }
  };

  const formatBookedSlots = (
    bookedSlots: { date: string; booked: boolean }[]
  ) => {
    return bookedSlots.map((slots) => new Date(slots.date));
  };

  React.useEffect(() => {
    fetchBookedSlots();
  }, []);
  return (
    <Container style="py-10">
      <div className="grid gap-4 md:grid-cols-5">
        <div className="space-y-4 md:col-span-3">
          <DualCalendar bookedSlots={bookedSlots} />
        </div>

        <div className="md:col-span-2">
          <Suspense fallback={<div>Loading...</div>}>
            <BookingForm bookedSlots={bookedSlots} />
          </Suspense>
        </div>
      </div>
    </Container>
  );
};

export default BookingSection;
