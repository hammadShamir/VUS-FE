"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { axiosService } from "@/services/axios";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/services/firebase";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
const Page = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      nickName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(4, "Minimum 3 characters Required")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      phone: Yup.string()
        .min(12, "Minimum 13 characters Required")
        .max(13, "Must be 13 characters Required")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[$]).{3,30}$/,
          "Password must contain at least one uppercase letter, one number, and one special character ($)."
        )
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .min(8, "Must be 8 characters or long")
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const token = await handleFbSignUp(values.email, values.password);
        const payload = {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
        };
        if (token) {
          await axiosService.post("/auth/sign-up", payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          await sendVerificationEmail();
        }
        navigate.push("/login")
      } finally {
        setLoading(false);
      }
    },
  });
  const handleFbSignUp = async (email: string, password: string): Promise<string | void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken(true);

      return token;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.code;
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred during sign-up.");
      }
    }
  };

  const sendVerificationEmail = async (): Promise<void> => {
    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        toast.success("Verification email sent! Check your inbox.");
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          toast.error(`Error sending verification email: ${error.message}`);
        } else {
          toast.error("An unexpected error occurred while sending the verification email.");
        }
      }
    } else {
      toast.error("No user signed in. Verification email failed.");
    }
  };
  return (
    <main className="relative w-full h-screen flex flex-col md:flex-row justify-center items-center">
      <div className="flex-1 h-full">
        <Image
          src={"/assets/img/Lawn/img-2.png"}
          alt="Sign In Sign Up Image"
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>
      <div className="flex-1 h-full bg-background flex justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="absolute md:relative top-[50%] md:top-auto translate-y-[-50%] md:translate-y-[auto] bg-background md:max-w-lg w-11/12 md:w-10/12 flex flex-col justify-center items-center py-6 gap-y-3 rounded-lg shadow-md"
        >
          <h1 className="text-4xl font-bold font-[family-name:var(--font-primary)]">
            Create An Account
          </h1>
          <div className="md:max-w-md w-10/12 md:w-10/12">
            <input
              type="text"
              name="fullName"
              required
              className="bg-accentColor px-4 py-2 md:p-4 rounded-md w-full font-[family-name:var(--font-secondary)]"
              placeholder="Full name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="text-red-300">{formik.errors.fullName}</div>
            ) : null}
          </div>
          <div className="md:max-w-md w-10/12 md:w-10/12">
            <input
              type="email"
              name="email"
              required
              className="bg-accentColor px-4 py-2 md:p-4 rounded-md w-full font-[family-name:var(--font-secondary)]"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-300">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="md:max-w-md w-10/12 md:w-10/12">
            <input
              type="text"
              name="phone"
              required
              className="bg-accentColor px-4 py-2 md:p-4 rounded-md w-full font-[family-name:var(--font-secondary)]"
              placeholder="Phone Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-300">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="md:max-w-md w-10/12 md:w-10/12">
            <input
              type="password"
              name="password"
              required
              className="bg-accentColor px-4 py-2 md:p-4 rounded-md w-full font-[family-name:var(--font-secondary)]"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-300">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="md:max-w-md w-10/12 md:w-10/12">
            <input
              type="password"
              name="confirmPassword"
              required
              className="bg-accentColor px-4 py-2 md:p-4 rounded-md w-full font-[family-name:var(--font-secondary)]"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-300">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="bg-primary text-background px-10 py-2  rounded-md font-[family-name:var(--font-secondary)] text-lg text-bold disabled:bg-accentColor disabled:text-primary"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p className="text-sm md:text-base text-center text-foreground font-[family-name:var(--font-secondary)]">
            Already have an account?
            <Link href="/login" className="text-primary underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Page;