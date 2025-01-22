"use client";

import { Button } from "@/components/ui/button";
import { CalendarCheck, Users } from "lucide-react";
import BookingStatusBadge from "../Booking-Status";

import { axiosService } from "@/services/axios";
import { useModal } from "@/context/Modal";
import { BookingStatus, IAdminManagementTable } from "@/interfaces";

export function AdminDetailsModal({ admin }: { admin: IAdminManagementTable }) {
  const { hideModal } = useModal();
  const handleUpdateAdmin = async (payload: Partial<IAdminManagementTable>) => {
    await axiosService.put(`/auth/update-user-status/${admin._id}`, payload);
    hideModal(true);
  };
  const deleteAdmin = async () => {
    await axiosService.delete(`/auth/remove-user/${admin._id}`);
    hideModal(true);
  };

  return (
    <div className="space-y-6 my-6">
      {/* Guest Information */}
      <div className="grid grid-cols-2 gap-4 px-2">
        {/* Rooms */}
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-sm">Name</span>
          </div>
          <p className="text-sm mt-1">{admin.fullName}</p>
        </div>

        {/* Guests */}
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-sm">Email</span>
          </div>
          <p className="text-sm mt-1">{admin.email}</p>
        </div>

        {/* Check In */}
        <div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-green-600" />
            <span className="font-medium text-sm">Phone</span>
          </div>
          <p className="text-sm mt-1">{admin.phone}</p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Status</span>
          </div>
          {admin.isActive ? (
            <BookingStatusBadge status={BookingStatus.active} />
          ) : (
            <BookingStatusBadge status={BookingStatus.inactive} />
          )}
        </div>
      </div>

      <div className=" flex justify-end self-end">
        {admin.isActive ? (
          <div className="col-span-3 flex justify-end self-end">
            <Button
              onClick={() => {
                handleUpdateAdmin({ isActive: false });
              }}
              className="bg-red-600 text-background"
              variant={"outline"}
            >
              In Active
            </Button>
          </div>
        ) : (
          <div className="col-span-3 flex justify-end self-end">
            <Button
              onClick={() => {
                handleUpdateAdmin({ isActive: true });
              }}
              className="bg-green-600 text-background mr-2"
              variant={"outline"}
            >
              Active
            </Button>
          </div>
        )}{" "}
        <div className="col-span-3 flex justify-end self-end">
          <Button
            onClick={deleteAdmin}
            className="bg-red-600 text-background"
            variant={"outline"}
          >
            Delete User
          </Button>
        </div>
      </div>
    </div>
  );
}
