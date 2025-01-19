"use client";

import * as React from "react";
import { ChevronUp, Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function BookingParameter() {
  const navigate = useRouter();
  const [checkIn, setCheckIn] = React.useState<Date>(new Date());
  const [checkOut, setCheckOut] = React.useState<Date>(new Date());
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(2);

  const RedirectBooking = () => {
    const queryParams = new URLSearchParams({
      checkIn: checkIn ? checkIn.toISOString() : "",
      checkOut: checkOut ? checkOut.toISOString() : "",
      adults: adults.toString(),
      children: children.toString(),
    });

    navigate.push(`/booking?${queryParams.toString()}`);
  };

  return (
    <div>
      <div className="relative font-[family-name:var(--font-secondary)] grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 p-6 rounded-lg text-background">
        {/* Check In */}
        <div className="flex">
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium mb-2">CHECK IN</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-[140px] justify-start text-left font-normal text-2xl hover:text-white hover:bg-transparent focus:text-white focus:bg-transparent",
                    !checkIn && "text-white"
                  )}
                >
                  {checkIn ? format(checkIn, "dd MMM") : ""}
                  <ChevronUp className="ml-auto h-4 w-4 " />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="hidden lg:block h-16 border-white border-l-2 ml-5  " />
        </div>

        {/* Check Out */}
        <div className="flex">
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium mb-2">CHECK OUT</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-[140px] justify-start text-left font-normal text-2xl hover:text-white hover:bg-transparent focus:text-white focus:bg-transparent",
                    !checkOut && "text-white"
                  )}
                >
                  {checkOut ? format(checkOut, "dd MMM") : ""}
                  <ChevronUp className="ml-auto h-4 w-4 " />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="hidden lg:block h-16 border-white border-l-2 ml-5 " />
        </div>

        {/* Adults */}
        <div className="flex">
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium mb-2">ADULT</span>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/20 hover:text-white"
                onClick={() => setAdults(Math.max(1, adults - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-2xl min-w-[40px] text-center">
                {adults.toString().padStart(2, "0")}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/20 hover:text-white"
                onClick={() => setAdults(Math.min(10, adults + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="hidden lg:block h-16 border-white border-l-2 ml-5 " />
        </div>
        {/* Children */}
        <div className="flex">
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium mb-2">CHILDREN</span>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/20 hover:text-white"
                onClick={() => setChildren(Math.max(0, children - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-2xl min-w-[40px] text-center">
                {children.toString().padStart(2, "0")}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/20 hover:text-white"
                onClick={() => setChildren(Math.min(10, children + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center  ">
        <Button
          onClick={RedirectBooking}
          className="text-background px-8 py-4"
          variant="outline"
        >
          BOOK NOW
        </Button>
      </div>
    </div>
  );
}
