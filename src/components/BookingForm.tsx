"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import DatePicker from "@/elements/Datepicker";
import { Button } from "./ui/button";
import { axiosService } from "@/services/axios";
import Cookies from "js-cookie";
import { useBookingContext } from "@/context/Booking";
import toast from "react-hot-toast";
import { IRoomsManagementTable } from "@/interfaces";
import { getToken } from "@/services/helper";
const BookingForm: React.FC<{
  onChangeDates: ({}) => void;
  bookedSlots: Date[];
}> = (props) => {
  const { bookingDetails } = useBookingContext();
  const payload = {
    checkIn: bookingDetails.checkIn,
    checkOut: bookingDetails.checkOut,
    adults: bookingDetails.adults,
    children: bookingDetails.children,
    bedrooms: bookingDetails.bedrooms,
  };

  const [bookingPayload] = useState<{
    checkIn: string;
    checkOut: string;
    adults?: string;
    children?: string;
    bedrooms?: string;
  }>(payload);

  const navigate = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [roomDetails, setRoomDetails] = useState<IRoomsManagementTable[]>();
  const [selectedRoomDetail, setSelectedRoomDetail] =
    useState<IRoomsManagementTable>();
  useEffect(() => {
    if (bookingDetails.checkIn) {
      formik.setFieldValue("checkIn", bookingDetails.checkIn);
    }
    if (bookingDetails.checkOut) {
      formik.setFieldValue("checkOut", bookingDetails.checkOut);
    }
  }, [bookingDetails.checkIn, bookingDetails.checkOut]);
  useEffect(() => {
    getRoomDetails();
  }, []);
  const getRoomDetails = async () => {
    const response = await axiosService.get(`/rooms/get-rooms`, {
      headers: {
        Authorization: getToken() || "",
      },
    });
    setRoomDetails(response.data);
  };
  useEffect(() => {
    if (roomDetails && bookingDetails.bedrooms) {
      updateBedroomAndPrice(+bookingDetails.bedrooms);
    }
  }, [roomDetails, bookingDetails.bedrooms]);
  const formik = useFormik({
    initialValues: {
      checkIn: bookingPayload.checkIn || "",
      checkOut: bookingPayload.checkOut || "",
      rooms: bookingPayload.bedrooms || "",
      adults: bookingPayload.adults || "",
      children: bookingPayload.children || "",
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

  // // Handle dynamic price based on rooms selection
  // React.useEffect(() => {
  //   if (formik.values.rooms === "1") {
  //     formik.setFieldValue("amount", "5");
  //   } else if (formik.values.rooms === "2") {
  //     formik.setFieldValue("amount", "10");
  //   } else if (formik.values.rooms === "3") {
  //     formik.setFieldValue("amount", "15");
  //   }
  // }, [formik && formik.values.rooms]);
  // Handle dynamic price based on rooms selection

  const onChangeSlots = async (date: Date | null, state: string) => {
    console.log(date, "test");
    // Validate that check-in is before check-out
    if (
      formik.values.checkIn &&
      date &&
      state === "checkOut" &&
      new Date(formik.values.checkIn) > date
    ) {
      toast.error("Check In must be before Check Out");
      return;
    }

    // Update the Formik field value
    if (date) {
      formik.setFieldValue(state, date);
    }

    // Update the booking details dynamically
    const selectedDate = {
      checkIn: formik.values.checkIn,
      checkOut: formik.values.checkOut,
    };
    props.onChangeDates({
      ...selectedDate,
      [state]: date ? date : null,
    });
    console.log({
      [state]: date ? date : null,
    });
    // setBookingDetails({
    //   [state]: date ? date.toISOString() : null,
    // });
  };
  const updateBedroomAndPrice = (count: number) => {
    const selectedRoomDetail =
      roomDetails && roomDetails.find((room) => room.roomsCount == count);
    console.log(roomDetails);
    formik.setFieldValue("rooms", selectedRoomDetail?.roomsCount);
    formik.setFieldValue("amount", selectedRoomDetail?.price);
    setSelectedRoomDetail(selectedRoomDetail);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" h-full w-full flex flex-col relative bg-primary p-6 rounded-lg gap-y-4"
    >
      <div className="flex justify-between items-center text-background">
        <h3 className="text-3xl font-[family-name:var(--font-primary)]">
          Reserve:
        </h3>
        <h6 className="text-xl font-[family-name:var(--font-secondary)]">
          From ${formik.values.amount}/night
        </h6>
      </div>
      <div className="h-full flex flex-col justify-center gap-y-6">
        {/* Check-In Date Picker */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="checkIn"
            className="text-background dark:text-background"
          >
            Check-In
          </label>
          <DatePicker
            placeholder="Check In"
            selectedDate={
              formik.values.checkIn ? new Date(formik.values.checkIn) : null
            }
            onDateChange={(date) => onChangeSlots(date, "checkIn")}
            disabledDates={props.bookedSlots}
          />
          {formik.touched.checkIn && formik.errors.checkIn && (
            <div className="text-red-500 text-sm">{formik.errors.checkIn}</div>
          )}
        </div>

        {/* Check-Out Date Picker */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="checkOut"
            className="text-background dark:text-background"
          >
            Check-Out
          </label>
          <DatePicker
            placeholder="Check Out"
            selectedDate={
              formik.values.checkOut ? new Date(formik.values.checkOut) : null
            }
            onDateChange={(date) => onChangeSlots(date, "checkOut")}
            disabledDates={props.bookedSlots}
          />
          {formik.touched.checkOut && formik.errors.checkOut && (
            <div className="text-red-500 text-sm">{formik.errors.checkOut}</div>
          )}
        </div>

        {/* Rooms Select */}
        <div className="relative w-full space-y-2">
          <label htmlFor="" className="text-background dark:text-background">
            Bedrooms
          </label>
          <select
            value={formik.values.rooms}
            onChange={(e) => updateBedroomAndPrice(e.target.value)}
            className="h-[40px] border border-background text-background text-base rounded-md block w-full px-4 focus:outline-none bg-transparent"
          >
            <option value="" disabled>
              Bedrooms
            </option>
            {roomDetails?.map((roomDetail) => (
              <option
                key={roomDetail.roomsCount}
                value={roomDetail.roomsCount}
                className="bg-secondary text-primary"
              >
                {roomDetail.label}
              </option>
            ))}
          </select>
          {formik.touched.rooms && formik.errors.rooms && (
            <div className="text-red-500 text-sm">{formik.errors.rooms}</div>
          )}
        </div>

        {/* Adults and Children Select */}
        <div className="flex items-center justify-between gap-y-4 md:gap-y-0 md:gap-x-4">
          <div className="relative w-full space-y-2">
            <label
              htmlFor="children"
              className="text-background dark:text-background"
            >
              Adults
            </label>
            <select
              value={formik.values.adults}
              onChange={(e) => formik.setFieldValue("adults", e.target.value)}
              className="h-[40px] border border-background text-background text-base rounded-md block w-full  px-4 focus:outline-none bg-transparent"
            >
              <option value="" disabled>
                Adults
              </option>
              {Array.from(
                { length: selectedRoomDetail?.adults || 0 },
                (_, i) => i + 1
              ).map((num) => (
                <option
                  className="bg-secondary text-primary"
                  key={num}
                  value={num}
                >
                  {num}
                </option>
              ))}
            </select>
            {formik.touched.adults && formik.errors.adults && (
              <div className="text-red-500 text-sm">{formik.errors.adults}</div>
            )}
          </div>
          <div className="relative w-full space-y-2">
            <label
              htmlFor="children"
              className="text-background dark:text-background"
            >
              Children
            </label>
            <select
              value={2}
              onChange={(e) => formik.setFieldValue("children", e.target.value)}
              className="h-[40px] border border-background text-background text-base rounded-md block w-full  px-4 focus:outline-none bg-transparent"
            >
              <option value="" disabled>
                Children
              </option>
              {Array.from(
                { length: selectedRoomDetail?.children || 0 },
                (_, i) => i + 1
              ).map((num) => (
                <option
                  className="bg-secondary text-primary"
                  key={num}
                  value={num}
                >
                  {num}
                </option>
              ))}
            </select>
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
