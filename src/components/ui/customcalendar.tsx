import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type CalendarProps = {
  initialDate: Date;
  bookedSlots?: Date[] | number[];
  selectedRange: { start: number | null; end: number | null };
  onRangeSelect: (start: number | null, end: number | null) => void;
  onMonthChange: (newDate: Date, isSecond?: boolean) => void;
  hoveredDate: number | null;
  onHover: (date: number | null) => void;
  isSecond?: boolean;
  firstCalenderMonth?: Date | number;
};

const CustomCalendar: React.FC<CalendarProps> = ({
  initialDate,
  bookedSlots = [],
  selectedRange,
  onRangeSelect,
  onMonthChange,
  hoveredDate,
  onHover,
  isSecond = false,
  firstCalenderMonth,
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  useEffect(() => {
    if (isSecond && firstCalenderMonth) {
      console.log(firstCalenderMonth, new Date(firstCalenderMonth));
      const newDate = new Date(firstCalenderMonth);
      newDate.setMonth((newDate.getMonth() as number) + 1);
      setCurrentDate(newDate);
      onMonthChange(newDate, isSecond);
    }
  }, [isSecond, firstCalenderMonth]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const normalizedBookedSlots = bookedSlots.map((slot) =>
    new Date(slot).setHours(0, 0, 0, 0)
  );

  const daysArray: { day: number; month: number; year: number }[] = [];

  // Fill in the days from the previous month
  for (let i = firstDay === 0 ? 6 : firstDay - 1; i > 0; i--) {
    daysArray.push({
      day: daysInPrevMonth - i + 1,
      month: month === 0 ? 11 : month - 1,
      year: month === 0 ? year - 1 : year,
    });
  }

  // Fill in the current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push({ day, month, year });
  }

  // Fill in the next month's days
  while (daysArray.length % 7 !== 0) {
    daysArray.push({
      day: (daysArray.length % 7) + 1,
      month: month === 11 ? 0 : month + 1,
      year: month === 11 ? year + 1 : year,
    });
  }

  const findNextBookedDate = (startDate: number) => {
    return (
      normalizedBookedSlots
        .filter((date) => date > startDate)
        .sort((a, b) => a - b)[0] || null
    );
  };

  const handleDateClick = useCallback(
    (fullDate: number) => {
      if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
        // If there is no start date or if the range is already selected, set the start
        onRangeSelect(fullDate, null);
      } else if (fullDate > selectedRange.start) {
        // If the clicked date is after the start date, find the next booked date
        const nextBookedDate = findNextBookedDate(selectedRange.start);
        const endDate =
          nextBookedDate && nextBookedDate < fullDate
            ? new Date(nextBookedDate).setHours(0, 0, 0, 0) -
              24 * 60 * 60 * 1000
            : fullDate;
        onRangeSelect(selectedRange.start, endDate);
      } else {
        // If the clicked date is before the start date, reset the range
        onRangeSelect(fullDate, null);
      }
    },
    [selectedRange, onRangeSelect, normalizedBookedSlots]
  );

  const handleDateHover = useCallback(
    (fullDate: number) => {
      if (selectedRange.start && !selectedRange.end) {
        // Only show hover up to the first booked date
        const nextBookedDate = findNextBookedDate(selectedRange.start);
        if (nextBookedDate && fullDate > nextBookedDate) {
          onHover(
            new Date(nextBookedDate).setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000
          );
        } else {
          onHover(fullDate);
        }
      } else {
        onHover(fullDate);
      }
    },
    [onHover]
  );

  const isInRange = useCallback(
    (fullDate: number) => {
      if (!selectedRange.start) return false;
      if (!selectedRange.end && hoveredDate) {
        return fullDate >= selectedRange.start && fullDate <= hoveredDate;
      }
      return (
        fullDate >= selectedRange.start &&
        fullDate <= (selectedRange.end || selectedRange.start)
      );
    },
    [selectedRange, hoveredDate]
  );

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    // Prevent changing if the second calendar's month is greater than or equal to the first
    newDate.setMonth(newDate.getMonth() + increment);
    if (
      (increment < 0 && newDate < new Date()) ||
      (increment < 0 &&
        isSecond &&
        (firstCalenderMonth as Date).getTime() === newDate.getTime())
    ) {
      return;
    }

    setCurrentDate(newDate);
    onMonthChange(newDate, isSecond);
  };

  return (
    <div className="p-4 border border-primary h-[300px]  box-border rounded-lg w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>
        <h2 className="text-center text-xl text-primary text-lg font-bold">
          {currentDate
            .toLocaleString("default", { month: "short" })
            .toUpperCase()}{" "}
          {year}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-primary text-md font-bold">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="p-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {daysArray.map((date, index) => {
          const isPrev =
            date.month < month || (date.month === 11 && month === 0);
          const isNext =
            date.month > month || (date.month === 0 && month === 11);
          const fullDate = new Date(date.year, date.month, date.day).setHours(
            0,
            0,
            0,
            0
          );
          const isBooked =
            normalizedBookedSlots.includes(fullDate) && !isPrev && !isNext;
          const inRange = isInRange(fullDate);

          const isDisabled = fullDate < new Date().setHours(0, 0, 0, 0);

          // Render empty space for previous and next month's dates
          if (isPrev || isNext) {
            return (
              <div
                key={index}
                className="p-1 h-8 flex items-center justify-center"
              >
                {/* Empty space for previous/next month's dates */}
              </div>
            );
          }

          return (
            <div
              key={index}
              onClick={() =>
                !isPrev && !isNext && !isDisabled && handleDateClick(fullDate)
              }
              onMouseEnter={() =>
                !isPrev && !isNext && !isDisabled && handleDateHover(fullDate)
              }
              onMouseLeave={() => onHover(null)}
              className={`
          p-1 h-8 flex items-center justify-center text-md font-bold
          transition-all duration-200 ease-in-out
          ${
            isBooked
              ? "bg-[#5A5A5A] cursor-not-allowed text-white dark:bg-[#5A5A5A]"
              : isDisabled
              ? `"bg-[#eeeeee] text-neutral-500 opacity-50 cursor-not-allowed dark:text-neutral-500 opacity-50"`
              : `
                cursor-pointer
                hover:bg-primary/10
                ${
                  inRange && !isPrev && !isNext
                    ? "bg-primary text-background"
                    : ""
                }
                ${
                  fullDate === selectedRange.start
                    ? "bg-primary text-white"
                    : ""
                }
                ${
                  fullDate === selectedRange.end ? "bg-primary text-white" : ""
                } 
              `
          }
        `}
            >
              {isBooked ? (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-full h-full ">
                      {date.day}
                    </TooltipTrigger>
                    <TooltipContent className="bg-secondary">
                      Booked
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <>{date.day}</>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
