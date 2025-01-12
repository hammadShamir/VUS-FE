"use client";

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
import { Badge } from "../ui/badge";
import { UserPlus, UserMinus, Eye } from "lucide-react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const AdminModalForm = ({
  admin,
}: {
  admin?: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    status: "active" | "inactive";
  };
}) => {
  // Validation schema with Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
    status: Yup.string()
      .oneOf(["active", "inactive"])
      .required("Status is required"),
  });

  return (
    <div className="space-y-6 my-6">
      {/* Admin Information */}
      <Formik
        initialValues={{
          fullName: admin?.fullName || "",
          email: admin?.email || "",
          phone: admin?.phone || "",
          password: admin?.password || "",
          isActive: admin?.status || "active",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {}}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <Field
                  as={Input}
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="mt-1 rounded-md px-2 md:w-full"
                />
                {touched.fullName && errors.fullName && (
                  <div className="text-sm text-red-600">{errors.fullName}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field
                  as={Input}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="mt-1 rounded-md px-2 md:w-full"
                />
                {touched.email && errors.email && (
                  <div className="text-sm text-red-600">{errors.email}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Phone</label>
                <Field
                  as={Input}
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="mt-1 rounded-md px-2 md:w-full"
                />
                {touched.phone && errors.phone && (
                  <div className="text-sm text-red-600">{errors.phone}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Password</label>
                <Field
                  as={Input}
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="mt-1 rounded-md px-2 md:w-full"
                />
                {touched.password && errors.password && (
                  <div className="text-sm text-red-600">{errors.password}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Status</label>
                <div className="text-black rounded-md border">
                  <Field
                    as={Select}
                    name="status"
                    className="mt-1 rounded-md px-2 border-2 text-black  md:w-full"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Field>
                </div>
                {touched.status && errors.status && (
                  <div className="text-sm text-red-600">{errors.status}</div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6">
              <Button
                type="submit"
                className="flex gap-2 bg-primary text-background w-full"
              >
                <UserPlus className="w-5 h-5" />
                {admin ? "Edit Admin" : "Add Admin"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminModalForm;
