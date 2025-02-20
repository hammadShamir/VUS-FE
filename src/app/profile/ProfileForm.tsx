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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const userSession = Cookies.get("user");
const user = userSession && JSON.parse(userSession);

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  nationality: string;
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
    .required("Phone number is required"),
  nationality: Yup.string().required("Nationality is required"),
});

function ProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();
  const [initialValues, setInitialValues] = useState<FormValues>({
    fullName: "",
    email: "",
    password: "***********",
    phone: "",
    nationality: "",
  });

  useEffect(() => {
    const userSession = Cookies.get("user");
    if (userSession) {
      const user = JSON.parse(userSession);
      setInitialValues({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        nationality: user.nationality || "",
        password: "***********",
      });
    }
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        nationality: values.nationality
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
  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent form submission
    router.push("/forgot-password");
  };

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
                className="w-full border-2 rounded-md text-foreground px-2 focus:border-primary outline-none h-10"
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
                readOnly={true}
                className="w-full border-2 rounded-md text-foreground px-2 focus:border-primary outline-none h-10 cursor-not-allowed"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.email}
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
                className=" bg-background border border-2 rounded-md w-full px-4 h-10
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
                Nationality
              </label>
              <Input
                id="address"
                {...formik.getFieldProps("nationality")}
                placeholder="Enter"
                className="w-full border-2 rounded-md text-foreground px-2 focus:border-primary outline-none h-10"
              />
              {formik.touched.nationality && formik.errors.nationality && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.nationality}
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
          {
            user && user.signInType === "email" && (
              <Button
                onClick={handleCancel}
                variant="outline"
                type="button"
                className="w-32 border-primary text-primary dark:border-primary dark:text-primary"
              >
                Update Password
              </Button>
            )
          }
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
