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
      defaultPrice: room?.defaultPrice || "",
      people: room?.people || "",
    },
    validationSchema: Yup.object({
      label: Yup.string().required("Label is required"),
      roomsCount: Yup.number().required("Room count is required"),
      defaultPrice: Yup.number().required("defaultPrice is required"),
      people: Yup.number().required("People count is required"),
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

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Replace any non-digit characters
    const value = e.target.value.replace(/[^0-9]/g, "");
    formik.setFieldValue(e.target.name, value);
  };
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
            <label className="block text-sm font-medium">Default Price</label>
            <Input
              type="number"
              name="defaultPrice"
              min={0}
              value={formik.values.defaultPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="defaultPrice"
              className="mt-1 rounded-md px-2 md:w-full"
            />
            {formik.touched.defaultPrice && formik.errors.defaultPrice && (
              <div className="text-sm text-red-600">
                {formik.errors.defaultPrice}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">People</label>
            <Input
              name="people"
              value={formik.values.people}
              onChange={handleNumericInput}
              onBlur={formik.handleBlur}
              placeholder="People"
              className="mt-1 rounded-md px-2 md:w-full"
            />
            {formik.touched.people && formik.errors.people && (
              <div className="text-sm text-red-600">{formik.errors.people}</div>
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
