"use client";

import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import DatePicker from "@/elements/Datepicker";
import { axiosService } from "@/services/axios";
import { IRoomsManagementTable } from "@/interfaces";
import { useEffect, useState } from "react";
import { getToken } from "@/services/helper";
// import { Label } from "@/components/ui/label"

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  bookingType: Yup.string().required("Please select a type"),
  checkIn: Yup.date().optional(),
  checkOut: Yup.date().optional(),
  adults: Yup.number().min(1, "At least 1 adult required").optional(),
  children: Yup.number().min(0).optional(),
  rooms: Yup.number().optional(),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

export default function ContactForm() {
  const [bookedSlots, setBookedSlots] = React.useState<Date[]>([]);
  const [roomDetails, setRoomDetails] = useState<IRoomsManagementTable[]>();
  const [selectedRoomDetail, setSelectedRoomDetail] =
    useState<IRoomsManagementTable>();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      bookingType: "",
      checkIn: undefined,
      checkOut: undefined,
      adults: "",
      children: "",
      rooms: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      return toast.promise(
        // This is the promise for sending email using emailjs
        emailjs.send(
          process.env.NEXT_PUBLIC_EMAIL_SERVICE_KEY!,
          process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_KEY!,
          values,
          process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!
        ),
        {
          loading: "Submitting...",

          success: () => {
            resetForm();

            return "Contact Form Submitted Successfully!";
          },
          // Error state message
          error: (err) => {
            const errorMessage =
              err?.message || "Oops, something went wrong. Please try again!";
            return errorMessage;
          },
        }
      );
    },
  });
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
  const handlePeopleChange = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    console.log(name, value);
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

  const formatBookedSlots = (
    bookedSlots: { date: string; booked: boolean }[]
  ) => {
    return bookedSlots.map((slots) => new Date(slots.date));
  };

  useEffect(() => {
    fetchBookedSlots();
  }, []);
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

  const updateBedroomAndPrice = (count: number) => {
    const selectedRoomDetail =
      roomDetails && roomDetails.find((room) => room.roomsCount == count);
    formik.setFieldValue("rooms", selectedRoomDetail?.roomsCount);
    setSelectedRoomDetail(selectedRoomDetail);
  };
  return (
    <div
      data-aos="fade-left"
      data-aos-delay="1000"
      className="w-full md:w-2/5 rounded-3xl bg-primary p-4 md:p-6"
    >
      <h2 className="mb-6 text-xl font-bold text-white md:text-3xl font-[family-name:var(--font-primary)]">
        Kindly Share Your Details
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2" data-aos="fade-up" data-aos-delay="100">
            <Input
              id="firstName"
              placeholder="First Name *"
              {...formik.getFieldProps("firstName")}
              className={cn(
                "border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white placeholder:text-background",
                formik.touched.firstName &&
                  formik.errors.firstName &&
                  "border-red-500"
              )}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-sm text-red-500">{formik.errors.firstName}</p>
            )}
          </div>
          <div className="space-y-2" data-aos="fade-up" data-aos-delay="200">
            <Input
              id="lastName"
              placeholder="Last Name *"
              {...formik.getFieldProps("lastName")}
              className={cn(
                "border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white placeholder:text-background ",
                formik.touched.lastName &&
                  formik.errors.lastName &&
                  "border-red-500"
              )}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-sm text-red-500">{formik.errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2" data-aos="fade-up" data-aos-delay="300">
          <Input
            id="phone"
            placeholder="Phone *"
            {...formik.getFieldProps("phone")}
            className={cn(
              "border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white placeholder:text-background focus-visible:border-white focus-visible:ring-0",
              formik.touched.phone && formik.errors.phone && "border-red-500"
            )}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-sm text-red-500">{formik.errors.phone}</p>
          )}
        </div>

        <div className="space-y-2" data-aos="fade-up" data-aos-delay="400">
          <Input
            id="email"
            placeholder="Email *"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={cn(
              "border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white placeholder:text-background focus-visible:border-white focus-visible:ring-0",
              formik.touched.email && formik.errors.email && "border-red-500"
            )}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <select
            name="bookingType"
            value={formik.values.bookingType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[40px] border border-background text-background text-base rounded-md block w-full  px-4 focus:outline-none bg-transparent"
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="booking" className="bg-secondary text-primary">
              Booking
            </option>
            <option
              value="customer Support"
              className="bg-secondary text-primary"
            >
              Customer Support
            </option>
            <option
              value="other Inquires"
              className="bg-secondary text-primary"
            >
              Other Inquires
            </option>
          </select>
          {formik.touched.children && formik.errors.bookingType && (
            <div className="text-red-500 text-sm">
              {formik.errors.bookingType}
            </div>
          )}
        </div>

        {formik.values.bookingType === "booking" && (
          <>
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="flex flex-col space-y-2"
            >
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
                onDateChange={(date) => formik.setFieldValue("checkIn", date)}
                disabledDates={bookedSlots}
              />
              {formik.touched.checkIn && formik.errors.checkIn && (
                <div className="text-red-500 text-sm">
                  {formik.errors.checkIn}
                </div>
              )}
            </div>

            {/* Check-Out Date Picker */}
            <div
              className="flex flex-col space-y-2"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <label
                htmlFor="checkOut"
                className="text-background dark:text-background"
              >
                Check-Out
              </label>
              <DatePicker
                placeholder="Check Out"
                selectedDate={
                  formik.values.checkOut
                    ? new Date(formik.values.checkOut)
                    : null
                }
                onDateChange={(date) => formik.setFieldValue("checkOut", date)}
                disabledDates={bookedSlots}
              />
              {formik.touched.checkOut && formik.errors.checkOut && (
                <div className="text-red-500 text-sm">
                  {formik.errors.checkOut}
                </div>
              )}
            </div>

            {/* Adults and Children Select */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="flex items-center justify-between gap-4 md:gap-y-0 "
            >
              <div className="relative w-full space-y-2">
                <label
                  htmlFor=""
                  className="text-background dark:text-background"
                >
                  Bedrooms
                </label>
                <select
                  value={formik.values.rooms}
                  onChange={(e) =>
                    updateBedroomAndPrice(Number(e.target.value))
                  }
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
                  <div className="text-red-500 text-sm">
                    {formik.errors.rooms}
                  </div>
                )}
              </div>
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
                  <div className="text-red-500 text-sm">
                    {formik.errors.adults}
                  </div>
                )}
              </div>
              <div className="relative w-full space-y-2 space-x-2">
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
                  <div className="text-red-500 text-sm">
                    {formik.errors.children}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <div className="space-y-2" data-aos="fade-up" >
          <Input
            name="subject"
            id="subject"
            placeholder="Subject *"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={cn(
              "border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white placeholder:text-background focus-visible:border-0 focus-visible:ring-0 focus-visible:border-[red]",
              formik.touched.subject &&
                formik.errors.subject &&
                "border-red-500"
            )}
          />
          {formik.touched.subject && formik.errors.subject && (
            <p className="text-sm text-red-500">{formik.errors.subject}</p>
          )}
        </div>
        <div className="space-y-2" data-aos="fade-up" >
          <Textarea
            id="message"
            name="message"
            placeholder="Message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={cn(
              "border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white placeholder:text-background focus-visible:border-white focus-visible:ring-0",
              formik.touched.message &&
                formik.errors.message &&
                "border-red-500"
            )}
          />
          {formik.touched.message && formik.errors.message && (
            <p className="text-sm text-red-500">{formik.errors.message}</p>
          )}
        </div>
        <Button
          variant={"outline"}
          type="submit"
          className="w-full text-background border-background"
        >
          SUBMIT
        </Button>
      </form>
    </div>
  );
}
