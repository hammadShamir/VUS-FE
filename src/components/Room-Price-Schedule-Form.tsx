"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import DatePicker from "@/elements/Datepicker";
import { Button } from "./ui/button";
import { axiosService } from "@/services/axios";

import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { getToken } from "@/services/helper";
const RoomPriceScheduleForm: React.FC<{
  onChangeDates: ({}) => void;
  startDate: string | Date;
  endDate: string | Date;
  roomId: string;
  onUpdate: () => void;
}> = (props) => {
  const navigate = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      price: "",
    },
    validationSchema: Yup.object({
      startDate: Yup.string().required("Required"),
      endDate: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axiosService.post(
          "/rooms/add-rooms-price-schedule",
          {
            ...values,
            roomId: props.roomId,
          },
          {
            headers: {
              Authorization: getToken() || "",
            },
          }
        );
        navigate.push(res.data);
        props.onUpdate();
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const startDate = props.startDate
      ? new Date(props.startDate).setHours(0, 0, 0, 0)
      : null;
    const endDate = props.endDate
      ? new Date(props.endDate).setHours(0, 0, 0, 0)
      : startDate;
    if (startDate) {
      formik.setFieldValue("startDate", startDate);
    }
    if (endDate) {
      formik.setFieldValue("endDate", endDate);
    }
  }, [props.startDate, props.endDate]);
  const onChangeSlots = async (date: Date | null, state: string) => {
    console.log("test");
    // Validate that check-in is before check-out
    if (
      date &&
      ((state === "endDate" && new Date(formik.values.startDate) > date) ||
        (state === "startDate" && new Date(formik.values.endDate) < date))
    ) {
      toast.error("The Check In date must be before the Check Out date");
      return;
    }
    if (date) {
      formik.setFieldValue(state, date);
    }

    // Update the booking details dynamically
    const selectedDate = {
      startDate: formik.values.startDate,
      endDate: formik.values.endDate,
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" h-full w-full flex flex-col relative bg-primary p-6 rounded-lg gap-y-4"
    >
      <div className="h-full flex flex-col justify-center gap-y-6">
        <h3 className="text-3xl font-[family-name:var(--font-primary)] text-background dark:text-white ">
          Add Custom Price Schedule
        </h3>
        {/* Check-In Date Picker */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="startDate"
            className="text-background dark:text-background"
          >
            Start Date
          </label>
          <DatePicker
            placeholder=" Start Date"
            selectedDate={
              formik.values.startDate ? new Date(formik.values.startDate) : null
            }
            onDateChange={(date) => onChangeSlots(date, "startDate")}
          />
          {formik.touched.startDate && formik.errors.startDate && (
            <div className="text-red-500 text-sm">
              {formik.errors.startDate}
            </div>
          )}
        </div>

        {/* Check-Out Date Picker */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="endDate"
            className="text-background dark:text-background"
          >
            End Date
          </label>
          <DatePicker
            placeholder="Check Out"
            selectedDate={
              formik.values.endDate ? new Date(formik.values.endDate) : null
            }
            onDateChange={(date) => onChangeSlots(date, "endDate")}
          />
          {formik.touched.endDate && formik.errors.endDate && (
            <div className="text-red-500 text-sm">{formik.errors.endDate}</div>
          )}
        </div>

        {/* amount Select */}
        <div className="relative w-full space-y-2">
          <label htmlFor="" className="text-background dark:text-background">
            Price
          </label>
          <Input
            className={cn(
              " border border-background bg-transparent rounded-md px-4 text-white placeholder:text-background focus-visible:border-white focus-visible:ring-0"
            )}
            placeholder="Enter Price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price && (
            <div className="text-red-500 text-sm">{formik.errors.price}</div>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="outline" disabled={loading}>
          {loading ? "Loading..." : "Add Schedule"}
        </Button>
      </div>
    </form>
  );
};

export default RoomPriceScheduleForm;
