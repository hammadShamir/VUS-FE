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
import { axiosService } from "@/services/axios";
import { useBookingContext } from "@/context/Booking";
import { getToken } from "@/services/helper";
import { IRoomsManagementTable } from "@/interfaces";
import toast from "react-hot-toast";

export default function BookingParameter() {
  const navigate = useRouter();
  const { setBookingDetails } = useBookingContext();
  const [checkIn, setCheckIn] = React.useState<Date>(new Date());
  const [checkOut, setCheckOut] = React.useState<Date>(new Date());
  const [adults, setAdults] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [bedrooms, setBedrooms] = React.useState(0);
  const [bookedSlots, setBookedSlots] = React.useState<Date[]>([]);
  const [roomDetails, setRoomDetails] =
    React.useState<IRoomsManagementTable[]>();
  const [selectedRoomDetail, setSelectedRoomDetail] =
    React.useState<IRoomsManagementTable>();
  React.useEffect(() => {
    getRoomDetails();
  }, []);
  const getRoomDetails = async () => {
    const response = await axiosService.get(`/rooms/get-rooms`, {
      headers: {
        Authorization: getToken() || "",
      },
    });
    if (response.data.length > 0) {
      setRoomDetails(response.data);
      setSelectedRoomDetail(response.data[0]); // Select the first room
      setBedrooms(response.data[0].roomsCount);
      setAdults(0);
      setChildren(0);
    }
  };
  const RedirectBooking = () => {
    setBookingDetails({
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      adults: adults,
      children: children,
      bedrooms: bedrooms,
    });
    navigate.push("/booking");
  };

  const fetchBookedSlots = async () => {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 2,
      0
    );
    const response = await axiosService.get("/slots/booked-slots", {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
    if (response.data.length) {
      setBookedSlots(formatBookedSlots(response.data));
    }
  };

  const formatBookedSlots = (
    bookedSlots: { date: string; booked: boolean }[]
  ) => {
    return bookedSlots.map((slots) => new Date(slots.date));
  };

  React.useEffect(() => {
    fetchBookedSlots();
  }, []);

  const isDateDisabled = (day: Date): boolean => {
    return (
      bookedSlots.some(
        (disabledDate) => disabledDate.toDateString() === day.toDateString()
      ) || false
    );
  };
  const updateBedroom = (roomsCount: number) => {
    if (!roomDetails || roomDetails.length === 0) return;

    // Ensure the bedroom count stays within bounds
    const newCount = Math.max(1, Math.min(roomsCount, roomDetails.length));
    const selectedRoomDetail = roomDetails.find(
      (room) => room.roomsCount === newCount
    );

    if (selectedRoomDetail) {
      setBedrooms(+selectedRoomDetail.roomsCount);
      setSelectedRoomDetail(selectedRoomDetail);
      setAdults(0);
      setChildren(0);
    }
  };
  const handleAdultChange = (increment: boolean) => {
    if (!selectedRoomDetail) {
      toast.error("Please select a bedroom first.");
      return;
    }
    const newAdults = increment ? adults + 1 : adults - 1;
    if (newAdults < 0) return;
    if (newAdults + children > selectedRoomDetail.people && increment) {
      toast.error(
        `Maximum ${selectedRoomDetail.people} people allowed in this bedroom(s).`
      );
      return;
    }
    setAdults(newAdults);
  };

  const handleChildrenChange = (increment: boolean) => {
    if (!selectedRoomDetail) {
      toast.error("Please select a bedroom first.");
      return;
    }
    const newChildren = increment ? children + 1 : children - 1;
    if (newChildren < 0) return;
    if (newChildren + adults > selectedRoomDetail.people && increment) {
      toast.error(
        `Maximum ${selectedRoomDetail.people} People allowed in this bedroom(s).`
      );
      return;
    }
    setChildren(newChildren);
  };

  return (
    <div>
      <div
        className="relative font-[family-name:var(--font-secondary)] grid grid-cols-2 
       lg:grid-cols-5 gap-6 sm:gap-8 p-6 rounded-lg text-background"
      >
        {/* Check In */}
        <div className="flex justify-center">
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
                  className="bg-secondary text-primary"
                  mode="single"
                  selected={checkIn}
                  onSelect={(day) => day && setCheckIn(day)}
                  fromDate={new Date()}
                  initialFocus
                  disabled={isDateDisabled}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="hidden lg:block h-16 border-white border-l-2   " />
        </div>

        {/* Check Out */}
        <div className="flex justify-center">
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
                  className=" bg-secondary text-primary"
                  mode="single"
                  selected={checkOut}
                  onSelect={(day) => day && setCheckOut(day)}
                  fromDate={new Date()}
                  initialFocus
                  disabled={isDateDisabled}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="hidden lg:block h-16 border-white border-l-2  " />
        </div>

        <div className="flex justify-center ">
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium mb-2">BEDROOMS</span>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/20 hover:text-white"
                onClick={() => updateBedroom(bedrooms - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-2xl min-w-[40px] text-center">
                {bedrooms.toString().padStart(2, "0")}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/20 hover:text-white"
                onClick={() => updateBedroom(bedrooms + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="hidden lg:block h-16 border-white border-l-2  " />
        </div>
        {/* Adults */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium mb-2">ADULT</span>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/20 hover:text-white"
                onClick={() => handleAdultChange(false)}
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
                onClick={() => handleAdultChange(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="hidden lg:block h-16 border-white border-l-2  " />
        </div>

        {/* Children */}
        <div className="flex col-span-2 lg:col-span-1 justify-center ">
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium mb-2">CHILDREN</span>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/20 hover:text-white"
                onClick={() => handleChildrenChange(false)}
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
                onClick={() => handleChildrenChange(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="hidden lg:block h-16 border-white border-l-2  " />
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
