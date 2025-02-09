import type React from "react";
import { useState, useCallback, useEffect } from "react";

import CustomCalendar from "./custom-calendar";
import { IRoomPriceSchedule } from "@/interfaces";

type DualCalendarProps = {
  onRangeSelect?: (start: Date, end: Date) => void;
  checkIn?: Date | string;
  checkOut?: Date | string;
  priceSchedule?: IRoomPriceSchedule[];
  defaultPrice?: number;
  onChangeDates: ({}: {
    startDate: Date | string;
    endDate: Date | string;
  }) => void;
};

const CalendarCard: React.FC<DualCalendarProps> = ({
  priceSchedule = [],
  onRangeSelect,
  checkIn,
  checkOut,
  defaultPrice,
  onChangeDates,
}) => {
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
        onChangeDates({
          startDate: start ? new Date(start).toISOString() : "",
          endDate: end
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
    const checkInDate = checkIn ? new Date(checkIn).setHours(0, 0, 0, 0) : null;
    const checkOutDate = checkOut
      ? new Date(checkOut).setHours(0, 0, 0, 0)
      : checkInDate;

    if (checkInDate && checkOutDate) {
      handleRangeSelect(checkInDate, checkOutDate, false);
    }

    if (checkInDate) {
      setCurrentDate(new Date(checkInDate));
    }
    if (
      checkOutDate &&
      checkInDate &&
      new Date(checkOutDate).getMonth() !== new Date(checkInDate).getMonth()
    ) {
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

  return (
    <div className="space-y-3">
      {/* First Calendar */}
      <CustomCalendar
        initialDate={currentDate}
        selectedRange={selectedRange}
        onRangeSelect={handleRangeSelect}
        onMonthChange={handleMonthChange}
        hoveredDate={hoveredDate}
        onHover={handleHover}
        priceSchedule={priceSchedule}
        defaultPrice={defaultPrice}
      />

      {/* Second Calendar */}
      <CustomCalendar
        initialDate={nextMonth}
        selectedRange={selectedRange}
        onRangeSelect={handleRangeSelect}
        onMonthChange={handleMonthChange}
        hoveredDate={hoveredDate}
        onHover={handleHover}
        isSecond={true}
        firstCalenderMonth={firstCalenderMonth}
        priceSchedule={priceSchedule}
        defaultPrice={defaultPrice}
      />
    </div>
  );
};

export default CalendarCard;
