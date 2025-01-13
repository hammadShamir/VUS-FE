"use client";
import React from "react";
import BookingForm from "./BookingForm";
import CustomCalender from "./ui/Custom-calendar";
import { axiosService } from "@/services/axios";
import Container from "./common/Container";
import { BookingStatus } from "@/interfaces";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

const BookingStatusBadge = ({ status }: any) => {
  const statusStyles: Record<string, string> = {
    [BookingStatus.pending]:
      "text-yellow-500 bg-yellow-100 dark:border-yellow-100",
    [BookingStatus.approved]:
      "text-green-500 bg-green-100 dark:border-green-100",
    [BookingStatus.rejected]: "text-red-500 bg-red-100 dark:border-red-100",
    [BookingStatus.complete]: "text-blue-500 bg-blue-100 dark:border-blue-100",
    [BookingStatus.cancelled]: "text-gray-500 bg-gray-100 dark:border-gray-100",
    [BookingStatus.active]: "text-blue-500 bg-blue-100 dark:border-blue-100",
    [BookingStatus.inactive]: "text-yellow-500 bg-yellow-100 dark:border-yellow-100",
  };

  return (
    <Badge variant="secondary" className={cn(statusStyles[status])}>
      {status}
    </Badge>
  );
};

export default BookingStatusBadge;
