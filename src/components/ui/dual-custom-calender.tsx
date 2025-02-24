import type React from "react";
import { useState, useCallback, useEffect } from "react";

import CustomCalendar from "./customcalendar";
import { useBookingContext } from "@/context/Booking";
import { IRoomPriceSchedule } from "@/interfaces";

type DualCalendarProps = {
  bookedSlots?: Date[] | number[];
  onRangeSelect?: (start: Date, end: Date) => void;
  checkIn?: Date | string;
  checkOut?: Date | string;
  priceSchedule?: IRoomPriceSchedule[];
  defaultPrice?: number;
};

const DualCalendar: React.FC<DualCalendarProps> = ({
  bookedSlots = [],
  priceSchedule = [],
  onRangeSelect,
  checkIn,
  checkOut,
  defaultPrice,
}) => {
  const { bookingDetails, setBookingDetails } = useBookingContext();
  const [selectedRange, setSelectedRange] = useState<{
    start: number | null;
    end: number | null;
  }>({
    start: null,
    end: null,
  });
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [nextMonth, setNextMonth] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const [firstCalenderMonth, setFirstCalenderMonth] = useState<Date | number>(
    () => {
      const date = new Date();
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  );

  // Adjusted useEffect to handle dependency changes

  // handleRangeSelect updates both the selected range and calls onRangeSelect
  const handleRangeSelect = useCallback(
    (
      start: number | null,
      end: number | null,
      isUpdateContext: boolean = true
    ) => {
      setSelectedRange({ start, end });
      if (isUpdateContext) {
        setBookingDetails({
          checkIn: start ? new Date(start).toISOString() : "",
          checkOut: end
            ? new Date(end).toISOString()
            : start
            ? new Date(start).toISOString()
            : "",
        });
      }
      if (start && end && onRangeSelect) {
        onRangeSelect(new Date(start), new Date(end));
      }
    },
    [onRangeSelect]
  );

  useEffect(() => {
    const checkInDate = bookingDetails.checkIn
      ? new Date(bookingDetails.checkIn).setHours(0, 0, 0, 0)
      : null;
    const checkOutDate = bookingDetails.checkOut
      ? new Date(bookingDetails.checkOut).setHours(0, 0, 0, 0)
      : checkInDate;

    if (checkInDate && checkOutDate) {
      handleRangeSelect(checkInDate, checkOutDate, false);
    }
  }, []);

  useEffect(() => {
    const checkInDate = checkIn ? new Date(checkIn).setHours(0, 0, 0, 0) : null;
    const checkOutDate = checkOut
      ? new Date(checkOut).setHours(0, 0, 0, 0)
      : checkInDate;
    if (checkInDate && checkOutDate) {
      handleRangeSelect(checkInDate, checkOutDate, false);
    }
    if (
      checkOutDate !== null &&
      checkInDate !== null &&
      (new Date(checkOutDate).getMonth() === new Date(checkInDate).getMonth() ||
        new Date(checkOutDate).getTime() === new Date(checkInDate).getTime())
    ) {
      setCurrentDate(new Date(checkInDate));
      setNextMonth(
        new Date(
          new Date(checkInDate).setMonth(new Date(checkInDate).getMonth() + 1)
        )
      );
      return;
    }
    if (checkInDate && checkOutDate !== null && checkInDate !== null) {
      setCurrentDate(new Date(checkInDate));
    }
    if (checkOutDate && checkInDate !== null) {
      setNextMonth(new Date(checkOutDate));
    }
  }, [checkIn, checkOut]);

  const handleHover = useCallback((date: number | null) => {
    setHoveredDate(date);
  }, []);

  const handleMonthChange = useCallback((newDate: Date, isSecond?: boolean) => {
    if (!isSecond) {
      setFirstCalenderMonth(newDate);
    }
    setCurrentDate(newDate);
    console.log(newDate);

    // Create a new Date instance before modifying
    const nextMonthDate = new Date(newDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

    setNextMonth(nextMonthDate);
  }, []);
  const onChangeAmount = (totalAmount: number, dayAmount: number) => {
    console.log(totalAmount, dayAmount);
    setBookingDetails({
      totalAmount,
      dayAmount,
    });
  };

  return (
    <div className="space-y-3">
      {/* First Calendar */}
      <CustomCalendar
        initialDate={currentDate}
        bookedSlots={bookedSlots}
        selectedRange={selectedRange}
        onRangeSelect={handleRangeSelect}
        onMonthChange={handleMonthChange}
        hoveredDate={hoveredDate}
        onHover={handleHover}
        priceSchedule={priceSchedule}
        defaultPrice={defaultPrice}
        onChangeAmount={onChangeAmount}
      />

      {/* Second Calendar */}
      <CustomCalendar
        initialDate={nextMonth}
        bookedSlots={bookedSlots}
        selectedRange={selectedRange}
        onRangeSelect={handleRangeSelect}
        onMonthChange={handleMonthChange}
        hoveredDate={hoveredDate}
        onHover={handleHover}
        isSecond={true}
        firstCalenderMonth={firstCalenderMonth}
        priceSchedule={priceSchedule}
        defaultPrice={defaultPrice}
        onChangeAmount={onChangeAmount}
      />
    </div>
  );
};

export default DualCalendar;
