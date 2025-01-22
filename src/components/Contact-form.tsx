"use client";

import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
// import { Label } from "@/components/ui/label"

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  bookingType: Yup.string().required("Please select a booking type"),
  checkIn: Yup.date().optional(),
  checkOut: Yup.date().optional(),
  adults: Yup.number().min(1, "At least 1 adult required").required(),
  children: Yup.number().min(0).required(),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

export default function ContactForm() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      bookingType: "",
      checkIn: undefined,
      checkOut: undefined,
      adults: 2,
      children: 0,
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
            {...formik.getFieldProps("email")}
            className={cn(
              "border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white placeholder:text-background focus-visible:border-white focus-visible:ring-0",
              formik.touched.email && formik.errors.email && "border-red-500"
            )}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <Select
          data-aos="fade-up"
          data-aos-delay="500"
          onValueChange={(value) => formik.setFieldValue("bookingType", value)}
          value={formik.values.bookingType}
        >
          <SelectTrigger className="border border-background bg-transparent text-white focus:ring-0">
            <SelectValue
              placeholder="Booking"
              data-aos="fade-up"
              data-aos-delay="500"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Booking</SelectItem>
            <SelectItem value="deluxe">Deluxe Room</SelectItem>
            <SelectItem value="suite">Suite</SelectItem>
          </SelectContent>
        </Select>

        <div className="space-y-2" data-aos="fade-up" data-aos-delay="1000">
          <Input
            id="subject"
            placeholder="Subject *"
            {...formik.getFieldProps("subject")}
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

        <div className="space-y-2" data-aos="fade-up" data-aos-delay="1100">
          <Textarea
            id="message"
            placeholder="Message"
            {...formik.getFieldProps("message")}
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
          data-aos="fade-up"
          data-aos-delay="1200"
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
