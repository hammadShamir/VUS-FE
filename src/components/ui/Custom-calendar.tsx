// components/Calendar.tsx
import React from "react";

type CalendarProps = {
  isNext?: boolean;
  bookedSlots?: Date[] | number[];
};

const CustomCalendar: React.FC<CalendarProps> = ({
  isNext = false,
  bookedSlots = [],
}) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Determine the month and year based on `isNext`
  const month = isNext ? currentMonth + 1 : currentMonth;
  const year = isNext && currentMonth === 11 ? currentYear + 1 : currentYear; // Move to next year if December

  const firstDay = new Date(year, month, 1).getDay(); // Get first day of the month
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in the month
  const daysInPrevMonth = new Date(year, month, 0).getDate(); // Get number of days in previous month

  bookedSlots = bookedSlots.map((slot) => new Date(slot).setHours(0, 0, 0, 0)); // Normalize booked slots to midnight
  const daysArray: { day: number; month: number; year: number }[] = [];

  // Fill in the days from the previous month
  for (let i = firstDay === 0 ? 6 : firstDay - 1; i > 0; i--) {
    daysArray.push({
      day: daysInPrevMonth - i + 1,
      month: month === 0 ? 11 : month - 1, // Adjust for previous year if month is January
      year: month === 0 ? year - 1 : year,
    });
  }

  // Fill in the current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push({ day, month, year });
  }

  // Fill in the next month's days to complete the grid
  while (daysArray.length % 7 !== 0) {
    daysArray.push({
      day: (daysArray.length % 7) + 1,
      month: month === 11 ? 0 : month + 1, // Adjust for next year if month is December
      year: month === 11 ? year + 1 : year,
    });
  }

  return (
    <div className="p-2 border border-primary box-border rounded-lg w-full">
      <h2 className="text-center text-primary text-lg font-bold mb-2">
        {new Date(year, month).toLocaleString("default", { month: "short" })}{" "}
        {year}
      </h2>
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
          const isBooked = bookedSlots.includes(fullDate); // Check if the date is booked

          return (
            <div
              key={index}
              className={`p-1 h-8 flex items-center justify-center text-md font-bold ${
                isPrev || isNext
                  ? "text-[#5A5A5A] cursor-not-allowed"
                  : `text-primary ${
                      isBooked
                        ? "bg-[#5A5A5A] cursor-not-allowed text-white dark:bg-[#5A5A5A]"
                        : ""
                    }`
              }`}
            >
              {date.day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
