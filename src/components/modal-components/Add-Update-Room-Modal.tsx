import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UserPlus } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IRoomsManagementTable } from "@/interfaces";
import { axiosService } from "@/services/axios";
import { useModal } from "@/context/Modal";
import { getToken } from "@/services/helper";

const AddRoomModal = ({ room }: { room?: IRoomsManagementTable }) => {
  const { hideModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);

  // Formik hook for managing form state
  const formik = useFormik({
    initialValues: {
      label: room?.label || "",
      roomsCount: room?.roomsCount || "",
      price: room?.price || "",
      adults: room?.adults || "",
      children: room?.children || "",
    },
    validationSchema: Yup.object({
      label: Yup.string().required("Label is required"),
      roomsCount: Yup.number().required("Room count is required"),
      price: Yup.number().required("Price is required"),
      adults: Yup.number().required("Adults count is required"),
      children: Yup.number().required("Children count is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (room) {
          await axiosService.put(`/rooms/update-room/${room._id}`, values, {
            headers: {
              Authorization: getToken() || "",
            },
          });
        } else {
          await axiosService.post("/rooms/add-room", values, {
            headers: {
              Authorization: getToken() || "",
            },
          });
        }
        hideModal(true);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="space-y-6 my-6">
      {/* Room Information */}
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Label</label>
            <Input
              name="label"
              value={formik.values.label}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Room Label"
              className="mt-1 rounded-md px-2 md:w-full"
            />
            {formik.touched.label && formik.errors.label && (
              <div className="text-sm text-red-600">{formik.errors.label}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Room Count</label>
            <Input
              type="number"
              name="roomsCount"
              min={0}
              value={formik.values.roomsCount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Room Count"
              className="mt-1 rounded-md px-2 md:w-full"
            />
            {formik.touched.roomsCount && formik.errors.roomsCount && (
              <div className="text-sm text-red-600">
                {formik.errors.roomsCount}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Price</label>
            <Input
              type="number"
              name="price"
              min={0}
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Price"
              className="mt-1 rounded-md px-2 md:w-full"
            />
            {formik.touched.price && formik.errors.price && (
              <div className="text-sm text-red-600">{formik.errors.price}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Adults</label>
            <Input
              min={0}
              type="number"
              name="adults"
              value={formik.values.adults}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Adults"
              className="mt-1 rounded-md px-2 md:w-full"
            />
            {formik.touched.adults && formik.errors.adults && (
              <div className="text-sm text-red-600">{formik.errors.adults}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Children</label>
            <Input
              min={0}
              type="number"
              name="children"
              value={formik.values.children}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Children"
              className="mt-1 rounded-md px-2 md:w-full"
            />
            {formik.touched.children && formik.errors.children && (
              <div className="text-sm text-red-600">
                {formik.errors.children}
              </div>
            )}
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
            {loading ? "Loading..." : room ? "Edit room" : "Add room"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRoomModal;
