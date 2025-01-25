import type React from "react";
import { useState, useCallback, useEffect, useRef } from "react";

import CustomCalendar from "./customcalendar";
import { useBookingContext } from "@/context/Booking";

type DualCalendarProps = {
  bookedSlots?: Date[] | number[];
  onRangeSelect?: (start: Date, end: Date) => void;
  checkIn?: Date | string;
  checkOut?: Date | string;
};

const DualCalendar: React.FC<DualCalendarProps> = ({
  bookedSlots = [],
  onRangeSelect,
  checkIn,
  checkOut,
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [firstCalenderMonth, setFirstCalenderMonth] = useState<Date | number>(
    new Date()
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
  }, [checkIn, checkOut]);

  const handleHover = useCallback((date: number | null) => {
    setHoveredDate(date);
  }, []);

  const handleMonthChange = useCallback((newDate: Date, isSecond?: boolean) => {
    if (!isSecond) {
      setFirstCalenderMonth(newDate);
    }
    setCurrentDate(newDate);
  }, []);

  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

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
      />
    </div>
  );
};

export default DualCalendar;
