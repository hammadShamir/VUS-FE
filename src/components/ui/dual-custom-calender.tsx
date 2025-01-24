import type React from "react";
import { useState, useCallback } from "react";

import CustomCalendar from "./customcalendar";
type DualCalendarProps = {
  bookedSlots?: Date[] | number[];
  onRangeSelect?: (start: Date, end: Date) => void;
};

const DualCalendar: React.FC<DualCalendarProps> = ({
  bookedSlots = [],
  onRangeSelect,
}) => {
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
    new Date().getMonth()
  );

  const handleRangeSelect = useCallback(
    (start: number | null, end: number | null) => {
      setSelectedRange({ start, end });
      if (start && end && onRangeSelect) {
        onRangeSelect(new Date(start), new Date(end));
      }
    },
    [onRangeSelect]
  );

  const handleHover = useCallback((date: number | null) => {
    setHoveredDate(date);
  }, []);

  const handleMonthChange = useCallback((newDate: Date, isSecond?: boolean) => {
    if (!isSecond) {
      setFirstCalenderMonth(newDate.getMonth());
    }
    setCurrentDate(newDate);
  }, []);

  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  return (
    <div className="space-y-3">
      <CustomCalendar
        initialDate={currentDate}
        bookedSlots={bookedSlots}
        selectedRange={selectedRange}
        onRangeSelect={handleRangeSelect}
        onMonthChange={handleMonthChange}
        hoveredDate={hoveredDate}
        onHover={handleHover}
      />
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
