"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
    UserCircle,
    Wallet,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const validationSchema = Yup.object({
    firstName: Yup.string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters"),
    lastName: Yup.string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    phone: Yup.string()
        .required("Phone number is required")
        .min(10, "Phone number must be at least 10 digits"),
    address: Yup.string().required("Address is required"),
    dateOfBirth: Yup.object({
        month: Yup.string().required("Month is required"),
        day: Yup.string().required("Day is required"),
        year: Yup.string().required("Year is required"),
    }),
    nation: Yup.string().required("Please select a nation"),
    language: Yup.string().required("Please select a language"),
    gender: Yup.string().required("Please select a gender"),
});

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString());

function ProfileForm() {
    const formik = useFormik({
        initialValues: {
            firstName: "Annette",
            lastName: "Black",
            password: "••••••••••",
            email: "annetteblack@gmail.com",
            phone: "485-645-2639",
            address: "116 Jaskólski Shorezure Suite 883",
            dateOfBirth: {
                month: "September",
                day: "31",
                year: "1993",
            },
            nation: "Colombia",
            language: "English",
            gender: "Male/Female",
            paymentMethods: [
                { type: "visa", number: "****8324", expiry: "09/24" },
                { type: "mastercard", number: "****8324", expiry: "09/24" },
            ],
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <div className="space-y-6 w-full p-4 md:ms-64 mt-14 mb-14 md:mb-0">
            <div className="flex items-center  mb-6">
                <span className="font-bold">My Profile</span>
                <span>&gt;</span>
                <span className="font-bold">Edit Profile</span>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-[40%,30%,30%] lg:space-x-6">
                        {/* Left Column */}
                        <div>
                            <div className="flex justify-center">
                                <div className="w-32 h-32 rounded-full bg-slate-200 flex items-center justify-center my-4">
                                    <UserCircle className="w-16 h-16 text-slate-400" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mb-6  gap-6 ">
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="text-sm font-[family-name:var(--font-secondary)] block mb-1"
                                    >
                                        First Name
                                    </label>
                                    <Input
                                        id="firstName"
                                        {...formik.getFieldProps("firstName")}
                                        className="border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
                                    />
                                    {formik.touched.firstName && formik.errors.firstName && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {formik.errors.firstName}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="text-sm font-[family-name:var(--font-secondary)] block mb-1"
                                    >
                                        Last Name
                                    </label>
                                    <Input
                                        id="lastName"
                                        {...formik.getFieldProps("lastName")}
                                        className="border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
                                    />
                                    {formik.touched.lastName && formik.errors.lastName && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {formik.errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="my-4 space-y-6">
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-[family-name:var(--font-secondary)] block mb-1"
                                    >
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        {...formik.getFieldProps("password")}
                                        className="border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {formik.errors.password}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-[family-name:var(--font-secondary)] block mb-1"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        {...formik.getFieldProps("email")}
                                        className="border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {formik.errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="text-sm font-[family-name:var(--font-secondary)] block mb-1"
                                    >
                                        Phone
                                    </label>
                                    <Input
                                        id="phone"
                                        {...formik.getFieldProps("phone")}
                                        className="border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
                                    />
                                    {formik.touched.phone && formik.errors.phone && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {formik.errors.phone}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="text-sm font-[family-name:var(--font-secondary)] block mb-1"
                                    >
                                        Address
                                    </label>
                                    <Input
                                        id="address"
                                        {...formik.getFieldProps("address")}
                                        className="border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
                                    />
                                    {formik.touched.address && formik.errors.address && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {formik.errors.address}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Middle Column */}
                        <div className="space-y-6 my-4">
                            <div>
                                <label
                                    htmlFor="nation"
                                    className="text-sm font-[family-name:var(--font-secondary)] block mb-1"
                                >
                                    Nation
                                </label>
                                <Input
                                    id="nation"
                                    {...formik.getFieldProps("nation")}
                                    className="border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
                                />
                                {formik.touched.nation && formik.errors.nation && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {formik.errors.nation}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="gender"
                                    className="text-sm font-[family-name:var(--font-secondary)] block mb-1"
                                >
                                    Gender
                                </label>
                                <Input
                                    id="gender"
                                    {...formik.getFieldProps("gender")}
                                    className="border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
                                />
                                {formik.touched.gender && formik.errors.gender && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {formik.errors.gender}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-[family-name:var(--font-secondary)] block mb-1">
                                    Date of Birth
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {/* Month Selector */}
                                    <div className="border-2 rounded-md text-foreground  w-full">
                                        <Select
                                            value={formik.values.dateOfBirth.month}
                                            onValueChange={(value) =>
                                                formik.setFieldValue("dateOfBirth.month", value)
                                            }
                                        >
                                            <SelectTrigger className="border-2 rounded-md text-foreground px-2 focus:border-primary outline-none ">
                                                <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {months.map((month) => (
                                                    <SelectItem key={month} value={month}>
                                                        {month}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="border-2 rounded-md text-foreground ">
                                        <Select
                                            value={formik.values.dateOfBirth.day}
                                            onValueChange={(value) =>
                                                formik.setFieldValue("dateOfBirth.day", value)
                                            }
                                        >
                                            <SelectTrigger className="border-2 rounded-md text-foreground px-2 focus:border-primary outline-none ">
                                                <SelectValue placeholder="Day" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {days.map((day) => (
                                                    <SelectItem key={day} value={day}>
                                                        {day}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {/* Year Selector */}
                                    <div className="border-2 rounded-md text-foreground ">
                                        <Select
                                            value={formik.values.dateOfBirth.year}
                                            onValueChange={(value) =>
                                                formik.setFieldValue("dateOfBirth.year", value)
                                            }
                                        >
                                            <SelectTrigger className="border-2 rounded-md text-foreground px-2 focus:border-primary outline-none ">
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {years.map((year) => (
                                                    <SelectItem key={year} value={year}>
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {formik.errors.dateOfBirth.month}
                                    </p>
                                )}
                            </div>
                            {/* Payment Methods */}
                            <div className="space-y-4">
                                <label className="text-sm font-[family-name:var(--font-secondary)] block">
                                    Payment Method
                                </label>
                                {formik.values.paymentMethods.map((method, index) => (
                                    <Card
                                        key={index}
                                        className="p-4 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            {method.type === "visa" ? (
                                                <Image src="/visa.svg" width={100} height={100} alt="Visa" className="h-8" />
                                            ) : (
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src="/mastercard.svg"
                                                    alt="Mastercard"
                                                    className="h-8"
                                                />
                                            )}
                                            <div>
                                                <div className="font-[family-name:var(--font-secondary)]">
                                                    {method.type === "visa" ? "Visa" : "Mastercard"} ****
                                                    {method.number}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Expire {method.expiry}
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </Card>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full bg-primary text-white "
                                    onClick={() => { }}
                                >
                                    <Wallet className="w-4 h-4 mr-2 text-background" />
                                    Add Payment Method
                                </Button>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6  my-4">
                            <div>
                                <label
                                    htmlFor="language"
                                    className="text-sm font-[family-name:var(--font-secondary)] block mb-1"
                                >
                                    Language
                                </label>
                                <Input
                                    id="language"
                                    {...formik.getFieldProps("language")}
                                    className="border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
                                />
                                {formik.touched.language && formik.errors.language && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {formik.errors.language}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button className="border-2 w-32 bg-primary " type="submit">
                            Save Changes
                        </Button>
                        <Button variant="ghost" className="w-32">
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ProfileForm;
