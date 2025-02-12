"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface PriceScheduleItem {
  startDate: string;
  endDate: string;

  price: number;
}

interface RoomPrice {
  _id: string;
  defaultPrice: number;
  priceSchedules: PriceScheduleItem[];
}

interface BookingDetails {
  checkIn: string;
  checkOut: string;
  adults?: number;
  children?: number;
  bedrooms?: number;
  totalAmount?: number;
  dayAmount?: number;
}

interface BookingContextType {
  bookingDetails: BookingDetails;
  setBookingDetails: (data: Partial<BookingDetails>) => void;
  priceSchedule: RoomPrice[];
  setPriceSchedule: (rooms: RoomPrice[]) => void;
  calculateTotalCostPrice: (data: {
    checkIn: string;
    checkOut: string;
    roomId: string;
  }) => { totalAmount: number; dayAmount: number };
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingDetails, setBookingDetailsState] = useState<BookingDetails>({
    checkIn: "",
    checkOut: "",
  });

  // This holds the full room price schedules coming from your backend
  const [priceSchedule, setPriceSchedule] = useState<RoomPrice[]>([]);

  // This caches the computed date maps for each room so that each room is processed only once.
  // The key is the room id, and the value is an object containing the default price and a dateMap.
  const [computedRoomPriceMap, setComputedRoomPriceMap] = useState<{
    [roomId: string]: { defaultPrice: number; dateMap: Map<number, number> };
  }>({});

  const setBookingDetails = (data: Partial<BookingDetails>) => {
    setBookingDetailsState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // Computes a dateMap for a given room.
  // For each day in each price schedule, the map will contain the price for that day.
  const computeDateMapForRoom = (room: RoomPrice): Map<number, number> => {
    const dateMap = new Map<number, number>();
    room.priceSchedules.forEach(({ startDate, endDate, price }) => {
      const start = new Date(startDate).setHours(0, 0, 0, 0);
      const end = new Date(endDate).setHours(0, 0, 0, 0);
      for (let date = start; date <= end; date += 86400000) {
        dateMap.set(date, price);
      }
    });
    return dateMap;
  };

  // This function calculates the total cost and average daily cost.
  // It uses the cached mapping if available, or computes it for the room if not.
  const calculateTotalCostPrice = ({
    checkIn,
    checkOut,
    roomId,
  }: {
    checkIn: string;
    checkOut: string;
    roomId: string;
  }): { totalAmount: number; dayAmount: number } => {
    console.log(checkIn, checkOut, "test");
    if (!checkIn || !checkOut || !roomId)
      return { totalAmount: 0, dayAmount: 0 };

    const startDate = new Date(checkIn).setHours(0, 0, 0, 0);
    const endDate = new Date(checkOut).setHours(0, 0, 0, 0);
    console.log(startDate, endDate, new Date(checkIn), new Date(checkOut));

    // Find the room object in the priceSchedule array
    const room = priceSchedule.find((room) => room._id === roomId);
    if (!room) return { totalAmount: 0, dayAmount: 0 };

    // Check if we already computed the price mapping for this room.
    let mapping = computedRoomPriceMap[roomId];
    if (!mapping) {
      // Compute the dateMap only once for the room
      const dateMap = computeDateMapForRoom(room);
      mapping = { defaultPrice: room.defaultPrice, dateMap };
      setComputedRoomPriceMap((prev) => ({ ...prev, [roomId]: mapping }));
    }

    const { defaultPrice, dateMap } = mapping;

    let total = 0;
    let days = 0;
    // Loop through each day in the range and sum the cost.
    for (let date = startDate; date <= endDate; date += 86400000) {
      console.log(dateMap.get(date), "check price");
      total += dateMap.get(date) ?? defaultPrice;
      days++;
    }
    const dayAmount = days > 0 ? Math.round(total / days) : 0;
    return { totalAmount: Math.round(total), dayAmount: dayAmount };
  };

  return (
    <BookingContext.Provider
      value={{
        bookingDetails,
        setBookingDetails,
        priceSchedule,
        setPriceSchedule,
        calculateTotalCostPrice,
      }}
    >
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
