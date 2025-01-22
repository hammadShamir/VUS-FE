"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "@/elements/Datepicker";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosService } from "@/services/axios";
import Cookies from "js-cookie";
const BookingForm: React.FC<{ bookedSlots: Date[] }> = (props) => {
  const searchParams = useSearchParams();

  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const bedrooms = searchParams.get("bedRooms");

  const navigate = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      checkIn: checkIn || "",
      checkOut: checkOut || "",
      rooms: bedrooms || "",
      adults: adults || "",
      children: children || "",
      amount: "0",
    },
    validationSchema: Yup.object({
      checkIn: Yup.string().required("Required"),
      checkOut: Yup.string().required("Required"),
      rooms: Yup.string().required("Required"),
      adults: Yup.string().required("Required"),
      children: Yup.string().required("Required"),
      amount: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const token = Cookies.get("token");
      if (!token) {
        navigate.push("/login?message=Login Required&redirect=booking");
        return;
      }
      setLoading(true);
      try {
        const res = await axiosService.post("/create-booking", values);
        navigate.push(res.data);
      } finally {
        setLoading(false);
      }
    },
  });

  // Handle dynamic price based on rooms selection
  React.useEffect(() => {
    if (formik.values.rooms === "1") {
      formik.setFieldValue("amount", "5");
    } else if (formik.values.rooms === "2") {
      formik.setFieldValue("amount", "10");
    } else if (formik.values.rooms === "3") {
      formik.setFieldValue("amount", "15");
    }
  }, [formik && formik.values.rooms]);
  // Handle dynamic price based on rooms selection

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" h-full w-full flex flex-col relative bg-primary p-6 rounded-lg gap-y-6"
    >
      <div className="flex justify-between items-center text-background">
        <h3 className="text-3xl font-[family-name:var(--font-primary)]">
          Reserve:
        </h3>
        <h6 className="text-xl font-[family-name:var(--font-secondary)]">
          From $299/night
        </h6>
      </div>
      <div className="h-full flex flex-col justify-center gap-y-8">
        {/* Check-In Date Picker */}
        <DatePicker
          placeholder="Check In"
          selectedDate={
            formik.values.checkIn ? new Date(formik.values.checkIn) : null
          }
          onDateChange={(date) =>
            formik.setFieldValue("checkIn", date ? date.toISOString() : "")
          }
          disabledDates={props.bookedSlots}
        />
        {formik.touched.checkIn && formik.errors.checkIn && (
          <div className="text-red-500 text-sm">{formik.errors.checkIn}</div>
        )}

        {/* Check-Out Date Picker */}
        <DatePicker
          placeholder="Check Out"
          selectedDate={
            formik.values.checkOut ? new Date(formik.values.checkOut) : null
          }
          onDateChange={(date) =>
            formik.setFieldValue("checkOut", date ? date.toISOString() : "")
          }
          disabledDates={props.bookedSlots}
        />
        {formik.touched.checkOut && formik.errors.checkOut && (
          <div className="text-red-500 text-sm">{formik.errors.checkOut}</div>
        )}

        {/* Rooms Select */}
        <Select
          value={formik.values.rooms}
          onValueChange={(value) => formik.setFieldValue("rooms", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Bedroom</SelectItem>
            <SelectItem value="2">2 Bedrooms</SelectItem>
            <SelectItem value="3">3 Bedrooms</SelectItem>
          </SelectContent>
        </Select>
        {formik.touched.rooms && formik.errors.rooms && (
          <div className="text-red-500 text-sm">{formik.errors.rooms}</div>
        )}

        {/* Adults and Children Select */}
        <div className="flex items-center justify-between gap-y-4 md:gap-y-0 md:gap-x-4">
          <div className="relative w-full">
            <Select
              value={formik.values.adults}
              onValueChange={(value) => formik.setFieldValue("adults", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Adults" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.adults && formik.errors.adults && (
              <div className="text-red-500 text-sm">{formik.errors.adults}</div>
            )}
          </div>
          <div className="relative w-full">
            <Select
              value={formik.values.children}
              onValueChange={(value) => formik.setFieldValue("children", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Children" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.children && formik.errors.children && (
              <div className="text-red-500 text-sm">
                {formik.errors.children}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center text-background">
          <h3 className="text-3xl font-[family-name:var(--font-primary)]">
            Total Cost
          </h3>
          <h6 className="text-xl font-[family-name:var(--font-secondary)]">
            {formik.values.amount}$
          </h6>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="outline" disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
