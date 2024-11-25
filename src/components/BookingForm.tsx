'use client';
import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { axiosService } from "@/services/axios";
const BookingForm = () => {
    const navigate = useRouter();
    const [loading, setLoading] = React.useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            checkIn: "",
            checkOut: "",
            rooms: "",
            adults: "",
            children: "",
            amount: ""
        },
        validationSchema: Yup.object({
            checkIn: Yup.date().required("Required"),
            checkOut: Yup.date().required("Required"),
            rooms: Yup.string().required("Required"),
            adults: Yup.string().required("Required"),
            children: Yup.string().required("Required"),
            amount: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await axiosService.post(
                    "/auth/sign-in",
                    values
                );
                navigate.push("/");
            } finally {
                setLoading(false);
            }
        },
    });
    return (
        <form
            onSubmit={formik.handleSubmit}
            className='relative lg:w-2/5 bg-primary p-4 rounded-md'
        >

            <button type='submit'>{loading ? "Booking" : "Book Now"}</button>
        </form>
    )
}

export default BookingForm
