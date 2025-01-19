"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/services/firebase";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { getFirebaseErrorMessage } from "@/services/helper";

const Page = () => {
  const router = useRouter(); // Corrected variable name for router
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await resetPassword(values.email); // Call the resetPassword function
        router.push("/login"); // Navigate to login after success
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMessage = getFirebaseErrorMessage(error);
        toast.error(errorMessage);
      } else {
        toast.error(
          "An unexpected error occurred while resetting the password."
        );
      }
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
      <div className="flex-1 h-[200px] bg-background flex justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="absolute md:relative  top-[50%] md:top-auto translate-y-[-50%] md:translate-y-[auto] bg-background md:max-w-lg w-11/12 md:w-10/12 flex flex-col justify-center items-center py-6 gap-y-3 rounded-lg shadow-md"
        >
          <h1 className="text-4xl font-bold font-[family-name:var(--font-primary)]">
            Forgot Password
          </h1>

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

          <button
            type="submit"
            className="bg-primary text-background px-10 py-2 rounded-md font-[family-name:var(--font-secondary)] text-lg font-bold disabled:bg-accentColor disabled:text-primary"
            disabled={loading}
          >
            {loading ? "Loading..." : "Reset Password"}
          </button>
          <p className="text-sm md:text-base text-center text-foreground font-[family-name:var(--font-secondary)]">
            Already have an account?{" "}
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
