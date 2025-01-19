import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "../ui/select";
import { UserPlus } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { status, UserRoles } from "@/interfaces";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { getFirebaseErrorMessage } from "@/services/helper";
import toast from "react-hot-toast";
import { auth } from "@/services/firebase";
import { axiosService } from "@/services/axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/Modal";

const AdminModalForm = ({
  admin,
}: {
  admin?: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    isActive: boolean;
  };
}) => {
  const { hideModal } = useModal();
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  // Formik hook for managing form state
  const formik = useFormik({
    initialValues: {
      fullName: admin?.fullName || "",
      email: admin?.email || "",
      phone: admin?.phone || "",
      password: admin?.password || "",
      isActive: (admin && admin.isActive) || false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const token = await handleFbSignUp(values.email, values.password);
        const payload = {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          role: UserRoles.SUB_ADMIN,
        };
        if (token) {
          await axiosService.post("/auth/sign-up", payload, {
            headers: {
              Authorization: token,
            },
          });
        }
        hideModal(true);
      } finally {
        setLoading(false);
      }
    },
  });
  const handleFbSignUp = async (
    email: string,
    password: string
  ): Promise<string | void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken(true);

      return token;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMessage = getFirebaseErrorMessage(error);
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred during register.");
      }
    }
  };
  return (
    <div className="space-y-6 my-6">
      {/* Admin Information */}
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <Input
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Full Name"
              className="mt-1 rounded-md px-2 md:w-full"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-sm text-red-600">
                {formik.errors.fullName}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
              className="mt-1 rounded-md px-2 md:w-full"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-red-600">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <Input
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Phone"
              className="mt-1 rounded-md px-2 md:w-full"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-sm text-red-600">{formik.errors.phone}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <Input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password"
              className="mt-1 rounded-md px-2 md:w-full"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm text-red-600">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <div className="text-black rounded-md border">
              <Select
                name="status"
                value={formik.values.isActive ? status.active : status.inactive}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  formik.setFieldValue("isActive", e.target.value === "active")
                }
                onBlur={formik.handleBlur}
                className="mt-1 rounded-md px-2 border-2 text-black  md:w-full"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    className="text-foreground"
                    aria-selected
                    value="active"
                  >
                    Active
                  </SelectItem>
                  <SelectItem className="text-foreground" value="inactive">
                    Inactive
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <Button
            type="submit"
            className="flex gap-2 bg-primary text-background w-full"
            disabled={loading}
          >
            <UserPlus className="w-5 h-5" />
            {loading ? "Loading..." : admin ? "Edit Admin" : "Add Admin"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminModalForm;
