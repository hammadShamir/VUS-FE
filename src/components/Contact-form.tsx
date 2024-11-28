"use client"

import * as React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
// import { CalendarIcon, MinusIcon, PlusIcon } from 'lucide-react'
// import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"

const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    bookingType: Yup.string().required("Please select a booking type"),
    checkIn: Yup.date().required("Check-in date is required"),
    checkOut: Yup.date().required("Check-out date is required"),
    adults: Yup.number().min(1, "At least 1 adult required").required(),
    children: Yup.number().min(0).required(),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
})

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
        onSubmit: (values) => {
            console.log(values)
            // Handle form submission
        },
    })

    return (
        <div className="w-full md:w-2/5 rounded-3xl bg-primary p-4 md:p-6">
            <h2 className="mb-6 text-xl font-bold text-white md:text-3xl font-[family-name:var(--font-primary)]">
                Kindly Share Your Details
            </h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Input
                            id="firstName"
                            placeholder="First Name *"
                            {...formik.getFieldProps("firstName")}
                            className={cn(
                                "border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white placeholder:text-background",
                                formik.touched.firstName && formik.errors.firstName && "border-red-500"
                            )}
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                            <p className="text-sm text-red-500">{formik.errors.firstName}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Input
                            id="lastName"
                            placeholder="Last Name *"
                            {...formik.getFieldProps("lastName")}
                            className={cn(
                                "border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white placeholder:text-background ",
                                formik.touched.lastName && formik.errors.lastName && "border-red-500"
                            )}
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                            <p className="text-sm text-red-500">{formik.errors.lastName}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
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

                <div className="space-y-2">
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
                    onValueChange={(value) => formik.setFieldValue("bookingType", value)}
                    value={formik.values.bookingType}
                >
                    <SelectTrigger className="border border-background bg-transparent text-white focus:ring-0">
                        <SelectValue placeholder="Booking" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="standard">Booking</SelectItem>
                        <SelectItem value="deluxe">Deluxe Room</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                    </SelectContent>
                </Select>

                {/* <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white hover:bg-transparent",
                                        !formik.values.checkIn && "text-background"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formik.values.checkIn ? (
                                        format(formik.values.checkIn, "dd MMM")
                                    ) : (
                                        <span>Check-in</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formik.values.checkIn}
                                    onSelect={(date) => formik.setFieldValue("checkIn", date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white hover:bg-transparent",
                                        !formik.values.checkOut && "text-background"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formik.values.checkOut ? (
                                        format(formik.values.checkOut, "dd MMM")
                                    ) : (
                                        <span>Check-out</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formik.values.checkOut}
                                    onSelect={(date) => formik.setFieldValue("checkOut", date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-background bg-transparent text-white hover:bg-white/10"
                            onClick={() => formik.setFieldValue("adults", Math.max(1, formik.values.adults - 1))}
                        >
                            <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span className="text-white">{formik.values.adults}</span>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-background bg-transparent text-white hover:bg-white/10"
                            onClick={() => formik.setFieldValue("adults", formik.values.adults + 1)}
                        >
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-background bg-transparent text-white hover:bg-white/10"
                            onClick={() => formik.setFieldValue("children", Math.max(0, formik.values.children - 1))}
                        >
                            <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span className="text-white">{formik.values.children}</span>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-background bg-transparent text-white hover:bg-white/10"
                            onClick={() => formik.setFieldValue("children", formik.values.children + 1)}
                        >
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div> */}

                <div className="space-y-2">
                    <Input
                        id="subject"
                        placeholder="Subject *"
                        {...formik.getFieldProps("subject")}
                        className={cn(
                            "border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white placeholder:text-background focus-visible:border-white focus-visible:ring-0",
                            formik.touched.subject && formik.errors.subject && "border-red-500"
                        )}
                    />
                    {formik.touched.subject && formik.errors.subject && (
                        <p className="text-sm text-red-500">{formik.errors.subject}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Textarea
                        id="message"
                        placeholder="Message"
                        {...formik.getFieldProps("message")}
                        className={cn(
                            "border-b border-t-0 border-l-0 border-r-0 border-background bg-transparent text-white placeholder:text-background focus-visible:border-white focus-visible:ring-0",
                            formik.touched.message && formik.errors.message && "border-red-500"
                        )}
                    />
                    {formik.touched.message && formik.errors.message && (
                        <p className="text-sm text-red-500">{formik.errors.message}</p>
                    )}
                </div>

                <Button
                    variant={'outline'}
                    type="submit"
                    className="w-full"
                >
                    SUBMIT
                </Button>
            </form>
        </div>
    )
}

