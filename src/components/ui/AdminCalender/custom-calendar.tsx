import { useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IRoomPriceSchedule } from "@/interfaces";

type CalendarProps = {
  initialDate: Date;
  selectedRange: { start: number | null; end: number | null };
  onRangeSelect: (start: number | null, end: number | null) => void;
  onMonthChange: (newDate: Date, isSecond?: boolean) => void;
  hoveredDate: number | null;
  onHover: (date: number | null) => void;
  isSecond?: boolean;
  firstCalenderMonth?: Date | number;
  priceSchedule?: IRoomPriceSchedule[];
  defaultPrice?: number;
};

const CustomCalendar: React.FC<CalendarProps> = ({
  initialDate,
  selectedRange,
  onRangeSelect,
  onMonthChange,
  hoveredDate,
  priceSchedule = [],
  defaultPrice,
  onHover,
  isSecond = false,
  firstCalenderMonth,
}) => {
  const month = initialDate.getMonth();
  const year = initialDate.getFullYear();

  const priceMap = useMemo(() => {
    const map = new Map<number, number>();
    console.log(priceSchedule);
    priceSchedule.forEach((schedule) => {
      const startDate = new Date(schedule.startDate).setHours(0, 0, 0, 0); // Normalize
      const endDate = new Date(schedule.endDate).setHours(0, 0, 0, 0); // Normalize

      for (let date = startDate; date <= endDate; date += 86400000) {
        map.set(date, schedule.price); // Store the price for each date
      }
    });

    return map;
  }, [priceSchedule]);

  const getPriceForDate = (date: number) => {
    const normalizedDate = new Date(date).setHours(0, 0, 0, 0); // Normalize to midnight
    return priceMap.get(normalizedDate) || false;
  };

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

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

  const handleDateClick = useCallback(
    (fullDate: number) => {
      console.log(selectedRange, "range");

      if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
        // Set new start date and reset selection
        onRangeSelect(fullDate, null);
      } else if (fullDate > selectedRange.start) {
        // If selecting end date, find the next booked date
        const nextBookedDate = false;
        const endDate =
          nextBookedDate && nextBookedDate < fullDate
            ? new Date(nextBookedDate).setHours(0, 0, 0, 0) - 86400000
            : fullDate;

        onRangeSelect(selectedRange.start, endDate);

        // Calculate the total price for the range
      } else {
        // Reset selection if clicked before start date
        onRangeSelect(fullDate, null);
      }
    },
    [selectedRange, onRangeSelect, getPriceForDate, defaultPrice]
  );

  const handleDateHover = useCallback(
    (fullDate: number) => {
      if (selectedRange.start && !selectedRange.end) {
        // Only show hover up to the first booked date
        const nextBookedDate = false;
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
    const newDate = new Date(initialDate);
    // Prevent changing if the second calendar's month is greater than or equal to the first
    newDate.setMonth(newDate.getMonth() + increment);
    if (
      (increment < 0 && new Date(initialDate) < new Date()) ||
      (increment < 0 &&
        isSecond &&
        (firstCalenderMonth as Date).getTime() === newDate.getTime())
    ) {
      return;
    }

    initialDate = newDate;
    onMonthChange(newDate, isSecond);
  };

  return (
    <div className="p-4 border border-primary h-full  box-border rounded-lg w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>
        <h2 className="text-center text-xl text-primary  font-bold">
          {initialDate
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
          const isScheduled = getPriceForDate(fullDate);
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
                !isPrev &&
                !isNext &&
                !isDisabled &&
                !isScheduled &&
                handleDateClick(fullDate)
              }
              onMouseEnter={() =>
                !isPrev &&
                !isNext &&
                !isDisabled &&
                !isScheduled &&
                handleDateHover(fullDate)
              }
              onMouseLeave={() => onHover(null)}
              className={`
           h-10 flex items-center justify-center text-md font-bold
          transition-all duration-200 ease-in-out
          ${
            isScheduled
              ? "bg-[#5A5A5A] cursor-not-allowed text-white dark:bg-[#5A5A5A]"
              : isDisabled
              ? `"bg-[#eeeeee] text-neutral-500 opacity-50 cursor-not-allowed dark:text-neutral-500 opacity-50"`
              : `
                cursor-pointer
               
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
              {isScheduled ? (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-full h-full ">
                      {date.day}
                      <p className="text-background text-xs space-y-2">
                        ${isScheduled}
                        <span className=" hidden md:inline-block">/night</span>
                      </p>
                    </TooltipTrigger>
                    <TooltipContent className="bg-secondary">
                      ${isScheduled}/night
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
