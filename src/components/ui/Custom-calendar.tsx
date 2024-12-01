// components/Calendar.tsx
import React from "react";

type CalendarProps = {
  isNext?: boolean;
  bookedSlots?: Date[] | number[];
};

const CustomCalendar: React.FC<CalendarProps> = ({ isNext=false, bookedSlots = [] }) => {
  const today = new Date();
  const currentMonth = today.getMonth(); 
  const currentYear = today.getFullYear();

  // Determine the month and year based on `isNext`
  const month = isNext ? currentMonth + 1 : currentMonth;
  const year = isNext && currentMonth === 11 ? currentYear + 1 : currentYear; // Move to next year if December

  const firstDay = new Date(year, month, 0).getDay(); // Get first day of the month
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in the month
  const daysInPrevMonth = new Date(year, month, 0).getDate(); // Get number of days in previous month

  bookedSlots = bookedSlots.map((slot) => new Date(slot).getTime()); // Convert to timestamps

  const daysArray: string[] = [];

  // Fill in the days from the previous month
  for (let i = firstDay === 0 ? 6 : firstDay - 1; i > 0; i--) {
    daysArray.push((daysInPrevMonth - i + 1).toString() + "-prev");
  }

  // Fill in the current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(day.toString());
  }

  // Fill in the next month's days to complete the grid
  while (daysArray.length % 7 !== 0) {
    daysArray.push((daysArray.length % 7 + 1).toString() + "-next");
  }

  return (
    <div className="p-2 border border-primary box-border rounded-lg w-full">
      <h2 className="text-center text-primary text-lg font-bold mb-2">
        {new Date(year, month).toLocaleString("default", { month: "short" })} {year}
      </h2>
      <div className="grid grid-cols-7 text-center text-primary text-md font-bold">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="p-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {daysArray.map((day, index) => {
          const isPrev = day.includes("-prev");
          const isNext = day.includes("-next");
          const dayValue = day.replace("-prev", "").replace("-next", "");

          const fullDate = new Date(`${year}-${month + 1}-${dayValue}`).getTime();
          const isBooked = bookedSlots.includes(fullDate); // Check if the date is booked

          return (
            <div
              key={index}
              className={`p-1 h-8 flex items-center justify-center text-md font-bold ${
                isPrev || isNext
                  ? "text-[#5A5A5A] cursor-not-allowed"
                  : `text-primary ${isBooked ? "bg-[#5A5A5A] cursor-not-allowed text-white" : ""}`
              }`}
            >
              {dayValue}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
