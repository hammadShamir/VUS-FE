"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { axiosService } from "@/services/axios";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/services/firebase";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
const Page = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const token = await handleFbLogin(values.email, values.password);
        if (token) {
          const res = await axiosService.post(
            "/auth/sign-in",
            {
              email: values.email,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          localStorage.setItem("token", res.data.token);
          navigate.push("/");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);
      const res = await axiosService.post("/auth/google-sign-in", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("token", res.data.token);
      navigate.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleFbLogin = async (email: string, password: string): Promise<string | void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken(true);

      return token;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.message;
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
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
      <div className="flex-1 h-full bg-background flex justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="absolute md:relative top-[50%] md:top-auto translate-y-[-50%] md:translate-y-[auto] bg-background md:max-w-lg w-11/12 md:w-10/12 flex flex-col justify-center items-center py-6 gap-y-6 rounded-lg shadow-md"
        >
          <h1 className="text-4xl font-bold font-[family-name:var(--font-primary)]">
            Welcome Back!
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
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4">
            <Link
              href="/signup"
              className="text-sm md:text-base text-foreground font-[family-name:var(--font-secondary)]"
            >
              Did you forget your password?
            </Link>
            <button
              type="submit"
              className="bg-primary text-background px-10 py-2 rounded-md font-[family-name:var(--font-secondary)] text-lg text-bold disabled:bg-accentColor disabled:text-primary"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <button
              type="button"
              className="bg-primary text-background px-10 py-2 rounded-md font-[family-name:var(--font-secondary)] text-lg text-bold disabled:bg-accentColor disabled:text-primary"
              onClick={handleGoogleSignIn}
            >
              Sign In With Google
            </button>
            <p className="text-sm md:text-base text-center text-foreground font-[family-name:var(--font-secondary)]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
