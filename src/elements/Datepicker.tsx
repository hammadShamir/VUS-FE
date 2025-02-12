"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IDatePicker } from "@/interfaces";

const DatePicker: React.FC<IDatePicker> = (props) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false); // State to control popover visibility

  const isDateDisabled = (day: Date): boolean => {
    return (
      props.disabledDates?.some(
        (disabledDate) => disabledDate.toDateString() === day.toDateString()
      ) || false
    );
  };

  const handleDateChange = (selected: Date | undefined) => {
    setDate(selected);
    props.onDateChange(selected || null);
    setOpen(false); // Close the date picker after selection
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `justify-start text-left font-normal border text-background border-background ${props.className}`,
            !date
          )}
          onClick={() => setOpen(true)} // Open on click
        >
          <CalendarIcon />
          {props.selectedDate &&
          !isNaN(new Date(props.selectedDate).getTime()) ? (
            format(new Date(props.selectedDate), "PPP")
          ) : (
            <span>{props.placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-secondary text-primary"
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          disabled={isDateDisabled}
          fromDate={new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
