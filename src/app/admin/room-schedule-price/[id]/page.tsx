"use client";
import React, { Suspense, useEffect, useState } from "react";
import { axiosService } from "@/services/axios";
import CalendarCard from "@/components/ui/AdminCalender/calender-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, Trash2 } from "lucide-react";
import { formatDate, getToken } from "@/services/helper";
import { useRouter } from "next/navigation";
import RoomPriceScheduleForm from "@/components/Room-Price-Schedule-Form";
import { IRoomPriceSchedule } from "@/interfaces";
import { useParams } from "next/navigation";

const Page = () => {
  const [checkIn, setCheckIn] = useState<Date | string>();
  const [checkOut, setCheckOut] = useState<Date | string>();
  const [formStartDate, setFormStartDate] = useState<Date | string>();
  const [formEndDate, setFormEndDate] = useState<Date | string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [roomSchedulePrice, setRoomSchedulePrice] = useState<
    IRoomPriceSchedule[]
  >([]);
  const params = useParams<{ id: string }>();
  const navigate = useRouter();

  const fetchRoomSchedulePrice = async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.get(
        `/rooms/get-rooms-price-schedule?roomId=${params.id}`,
        {
          headers: {
            Authorization: getToken() || "",
          },
        }
      );
      setRoomSchedulePrice(response.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomSchedulePrice();
  }, []);
  const onUpdate = () => {
    fetchRoomSchedulePrice();
  };

  const onChangeDates = (data: { startDate?: string; endDate?: string }) => {
    if (data.startDate) {
      setCheckIn(data.startDate);
      setCheckOut(data.endDate);
    }
    if (data.endDate) {
      setCheckOut(data.endDate);
    }
  };
  const onChangeCalenderDates = (data: {
    startDate?: string | Date;
    endDate?: string | Date;
  }) => {
    if (data.startDate) {
      setFormStartDate(data.startDate);
      setFormEndDate(data.endDate);
    }
    if (data.endDate) {
      setFormEndDate(data.endDate);
    }
  };
  const deleteSchedule = async (schedule: IRoomPriceSchedule) => {
    await axiosService.delete(
      `/rooms/remove-rooms-price-schedule/${schedule._id}`,
      {
        headers: {
          Authorization: getToken() || "",
        },
      }
    );
    fetchRoomSchedulePrice();
  };
  return (
    <section className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <button
          onClick={() => navigate.push("/admin/rooms")}
          className="flex items-center gap-1 text-gray-700 hover:text-primary transition"
        >
          <ChevronLeft className="w-10 h-10" />
          <span className="text-primary font-bold text-2xl">Back</span>
        </button>

        <h3 className="text-right text-primary text-xl md:text-2xl font-bold flex-1">
          Pricing Schedule
        </h3>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        <div className="space-y-4 md:col-span-3">
          <CalendarCard
            checkIn={checkIn}
            checkOut={checkOut}
            onChangeDates={onChangeCalenderDates}
            priceSchedule={roomSchedulePrice}
          />
        </div>

        <div className="md:col-span-2">
          <Suspense fallback={<div>Loading...</div>}>
            <RoomPriceScheduleForm
              startDate={formStartDate || ""}
              endDate={formEndDate || ""}
              onChangeDates={onChangeDates}
              roomId={params.id}
              onUpdate={onUpdate}
            />
          </Suspense>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-md border overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader className="mx-auto">
                <TableRow>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isError ? (
                  <span>Error</span>
                ) : isLoading ? (
                  <span>Loading...</span>
                ) : !roomSchedulePrice.length ? (
                  <TableRow>
                    <TableCell className="font-medium" colSpan={5}>
                      <h3 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-primary md:text-4xl text-center w-full">
                        No Schedule Available
                      </h3>
                    </TableCell>
                  </TableRow>
                ) : (
                  roomSchedulePrice?.map((schedule, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        {formatDate(schedule.startDate as string)}
                      </TableCell>
                      <TableCell>
                        {formatDate(schedule.endDate as string)}
                      </TableCell>
                      <TableCell>{schedule.price}</TableCell>

                      <TableCell className="flex  items-center space-x-2">
                        {" "}
                        {/* <Pencil
                          onClick={() => updateSchedule(schedule)}
                          className="h-4 w-4"
                        />{" "} */}
                        <Trash2
                          onClick={() => deleteSchedule(schedule)}
                          className="h-4 w-4"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
