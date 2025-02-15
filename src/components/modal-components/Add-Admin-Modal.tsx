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
import { UserRoles } from "@/interfaces";
import { axiosService } from "@/services/axios";
import { useModal } from "@/context/Modal";
const AdminModalForm = ({
  admin,
}: {
  admin?: {
    email: string;
    role: string;
  };
}) => {
  const { hideModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);

  // Formik hook for managing form state
  const formik = useFormik({
    initialValues: {
      email: admin?.email || "",
      role: admin?.role || UserRoles.SUB_ADMIN,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const payload = {
          email: values.email,
          role: values.role,
        };
        await axiosService.put("/auth/update-user-to-admin", payload, {
        });
        hideModal(true);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="space-y-6 my-6">
      {/* Admin Information */}
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
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
            <label className="block text-sm font-medium">Role</label>
            <div className="text-black rounded-md border">
              <Select
                name="role"
                value={formik.values.role}
                onValueChange={(value) => formik.setFieldValue("role", value)}
              >
                <SelectTrigger className="mt-1 rounded-md px-2 border-2 text-black  md:w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRoles.SUB_ADMIN}>Sub Admin</SelectItem>
                  <SelectItem value={UserRoles.ADMIN}>Admin</SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.role && formik.errors.role && (
                <div className="text-sm text-red-600">{formik.errors.role}</div>
              )}
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
