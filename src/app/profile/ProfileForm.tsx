"use client";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PhoneInput from "react-phone-number-input";
import { axiosService } from "@/services/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const userSession = Cookies.get("user");
const user = userSession && JSON.parse(userSession);

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  phone: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),
  address: Yup.string().required("Address is required"),
});

function ProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();
  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: user?.fullName,
      password: "***********",
      email: user?.email || null,
      phone: user?.phone || null,
      address: "116 Jaskólski Shorezure Suite 883",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
      };
      try {
        setLoading(true);
        await axiosService.put("/auth/update-user", payload);
        const allCookies = Cookies.get();
        for (const cookieName in allCookies) {
          Cookies.remove(cookieName, { path: "/" });
        }
        router.push("/");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="space-y-6 w-full p-4 md:ms-64 mt-20 mb-14 md:mb-0 rounded-lg">
      <h1 className="text-2xl font-bold">Edit Profile:</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="">
            {/* <UserIcon className="w-16 h-16 text-slate-400" /> */}
            <Avatar className="w-32 h-32 y">
              <AvatarImage src={user?.photo} alt={"profile Photo"} />
              <AvatarFallback>
                <UserIcon className="w-16 h-16   text-slate-400" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="text-sm font-medium block mb-1"
              >
                Full Name
              </label>
              <Input
                id="fullName"
                {...formik.getFieldProps("fullName")}
                placeholder="Enter First Name"
                className="w-full border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium block mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email"
                {...formik.getFieldProps("email")}
                className="w-full border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium block mb-1"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
                className="w-full border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="text-sm font-medium block mb-1">
                Phone
              </label>

              <PhoneInput
                international
                countryCallingCodeEditable={true}
                defaultCountry="ID"
                name="phone"
                value={formik.values.phone}
                onChange={(value) => formik.setFieldValue("phone", value)}
                onBlur={formik.handleBlur}
                className=" p-2 bg-background mt-1 border border-2 rounded-md w-full px-4 py-2
    focus-within:border-2 focus-within:border-black  "
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
                className="text-sm font-medium block mb-1"
              >
                Address
              </label>
              <Input
                id="address"
                {...formik.getFieldProps("address")}
                placeholder="Enter Address"
                className="w-full border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.address}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6 text-background dark:text-background">
          <Button
            variant="default"
            disabled={loading}
            type="submit"
            className={`w-32  ${loading ? "bg-primary/40" : "bg-primary"}`}
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            className="w-32 border-primary text-primary dark:border-primary dark:text-primary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
