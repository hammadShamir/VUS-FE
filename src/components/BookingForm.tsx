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
import { IRoomPriceSchedule, IRoomsManagementTable } from "@/interfaces";
import { getToken } from "@/services/helper";
const BookingForm: React.FC<{
  onChangeDates: ({}) => void;
  onChangePriceSchedule: (
    price: number,
    data: IRoomPriceSchedule[] | []
  ) => void;
  bookedSlots: Date[];
}> = (props) => {
  const { bookingDetails, calculateTotalCostPrice, setPriceSchedule } =
    useBookingContext();

  const navigate = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [roomDetails, setRoomDetails] = useState<IRoomsManagementTable[]>();
  const [perDayAmount, setPerDayAmount] = useState<number>();
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
    setPriceSchedule(response.data);
    setSelectedRoomDetail(response.data[0]);
    formik.setFieldValue("rooms", response.data[0].roomsCount);
    props.onChangePriceSchedule(
      response.data[0].defaultPrice,
      response.data[0].priceSchedules || []
    );
  };
  useEffect(() => {
    if (roomDetails && bookingDetails.bedrooms) {
      updateBedroomAndPrice(+bookingDetails.bedrooms);
    }
  }, [roomDetails, bookingDetails.bedrooms]);
  const formik = useFormik({
    initialValues: {
      checkIn: bookingDetails.checkIn || "",
      checkOut: bookingDetails.checkOut || "",
      rooms: bookingDetails.bedrooms || "",
      adults: bookingDetails.adults || "",
      children: bookingDetails.children || "",
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
  useEffect(() => {
    updatePriceAmount();
  }, [formik.values.checkIn, formik.values.checkOut, selectedRoomDetail]);
  const updatePriceAmount = () => {
    const selectedDate = {
      checkIn: formik.values.checkIn,
      checkOut: formik.values.checkOut,
    };
    const response = calculateTotalCostPrice({
      ...selectedDate,
      roomId: selectedRoomDetail?._id as string,
    });
    formik.setFieldValue("amount", response.totalAmount);
    setPerDayAmount(response.dayAmount);
  };

  const handlePeopleChange = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    const newValue = Number(value);
    const totalPeople =
      name === "adults"
        ? newValue + +formik.values.children
        : +formik.values.adults + newValue;

    if (totalPeople > (selectedRoomDetail?.people || 0)) {
      toast.error(
        `Maximum ${selectedRoomDetail?.people} people allowed in this bedroom(s).`
      );
      return;
    }

    formik.setFieldValue(name, value);
  };

  const onChangeSlots = async (date: Date | null, state: string) => {
    if (!date) return;

    let checkIn = new Date(formik.values.checkIn);
    let checkOut = new Date(formik.values.checkOut);

    if (state === "checkIn") {
      // If the new check-in date is after check-out, set check-out to the same date
      if (checkOut && date > checkOut) {
        checkOut = date;
      }
      checkIn = date;
    } else if (state === "checkOut") {
      // If the new check-out date is before check-in, set check-in to the same date
      if (checkIn && date < checkIn) {
        checkIn = date;
      }
      checkOut = date;
    }

    // Update form values
    formik.setFieldValue("checkIn", checkIn);
    formik.setFieldValue("checkOut", checkOut);

    // Notify parent component of the change
    props.onChangeDates({ checkIn, checkOut });
  };

  const updateBedroomAndPrice = (count: number) => {
    const selectedRoomDetail =
      roomDetails && roomDetails.find((room) => room.roomsCount == count);
    if (selectedRoomDetail) {
      formik.setFieldValue("rooms", selectedRoomDetail?.roomsCount);
      setSelectedRoomDetail(selectedRoomDetail);
      props.onChangePriceSchedule(
        selectedRoomDetail?.defaultPrice,
        selectedRoomDetail?.priceSchedules || []
      );
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" h-full w-full flex flex-col relative bg-primary p-6 rounded-lg gap-y-3"
    >
      <div className="flex  items-center text-background justify-between">
        <h3 className="text-4xl font-[family-name:var(--font-primary)]">
          Reserve:
        </h3>
        <h6 className="text-2xl font-[family-name:var(--font-secondary)]">
          From ${perDayAmount || 0}/night
        </h6>
      </div>
      <div className=" flex flex-col h-full justify-center gap-y-8">
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
            onChange={(e) => updateBedroomAndPrice(Number(e.target.value))}
            className="h-[40px] border border-background text-background text-base rounded-md block w-full px-4 focus:outline-none bg-transparent"
          >
            <option value="" disabled>
              Bedrooms
            </option>
            {roomDetails?.map((roomDetail, i: number) => (
              <option
                key={i}
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

        <div className="relative w-full space-y-2">
          <label
            htmlFor="children"
            className="text-background dark:text-background"
          >
            Adults
          </label>
          <select
            value={formik.values.adults}
            onChange={(e) => handlePeopleChange("adults", e)}
            className="h-[40px] border border-background text-background text-base rounded-md block w-full  px-4  focus:outline-none bg-transparent"
          >
            <option value="" disabled>
              Adults
            </option>
            {Array.from(
              { length: selectedRoomDetail?.people || 0 },
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
        <div className="relative w-full space-y-2 ">
          <label
            htmlFor="children"
            className="text-background dark:text-background"
          >
            Children
          </label>
          <select
            onChange={(e) => handlePeopleChange("children", e)}
            className="h-[40px] border border-background text-background text-base rounded-md block w-full px-4   focus:outline-none bg-transparent"
            value={formik.values.children}
          >
            <option value="" disabled>
              Children
            </option>
            <option value="0" className="bg-secondary text-primary">
              0
            </option>
            {Array.from(
              { length: selectedRoomDetail?.people || 0 },
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
            <div className="text-red-500 text-sm">{formik.errors.children}</div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4 text-background">
          <h3 className="text-3xl font-[family-name:var(--font-primary)]">
            Total Cost
          </h3>
          <h6 className="text-2xl font-[family-name:var(--font-secondary)]">
            ${formik.values.amount}
          </h6>
        </div>
        {/* Submit Button */}
        <Button
          className="py-6 text-xl font-bold"
          type="submit"
          variant="outline"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Now"}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
