"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
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
  const formik = useFormik({
    initialValues: {
      firstName: "Annette",
      lastName: "Black",
      password: "••••••••••",
      email: "annetteblack@gmail.com",
      phone: "485-645-2639",
      address: "116 Jaskólski Shorezure Suite 883",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="space-y-6 w-full p-4 md:ms-64 mt-20 mb-14 md:mb-0 rounded-lg">
      <h1 className="text-2xl font-bold">Edit Profile:</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-slate-200 flex items-center justify-center">
            <UserIcon className="w-16 h-16 text-slate-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="firstName"
                className="text-sm font-medium block mb-1"
              >
                Full Name
              </label>
              <Input
                id="firstName"
                {...formik.getFieldProps("firstName")}
                className="w-full border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.firstName}
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
              <Input
                id="phone"
                {...formik.getFieldProps("phone")}
                className="w-full border-2 rounded-md text-foreground px-2 focus:border-primary outline-none "
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
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="default" type="submit" className="w-32 bg-primary">
            Save Changes
          </Button>
          <Button variant="outline" className="w-32">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
