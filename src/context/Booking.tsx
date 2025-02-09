"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type BookingDetails = {
  checkIn: string; //
  checkOut: string;
  adults?: number;
  children?: number;
  bedrooms?: number;
  totalAmount?: number;
  dayAmount?: number;
};

type BookingContextType = {
  bookingDetails: BookingDetails;
  setBookingDetails: (data: Partial<BookingDetails>) => void; // Function to update the object
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingDetails, setBookingDetailsState] = useState<BookingDetails>({
    checkIn: "", // Required
    checkOut: "", // Required
  });

  const setBookingDetails = (data: Partial<BookingDetails>) => {
    setBookingDetailsState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
