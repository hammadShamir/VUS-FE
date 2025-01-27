"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { axiosService } from "@/services/axios";
import { getToken } from "@/services/helper";
import RoomsManagementTable from "@/components/Room-Managment-Table";
import { IRoomsManagementTable } from "@/interfaces";
import AddRoomModal from "@/components/modal-components/Add-Update-Room-Modal";
import { useModal } from "@/context/Modal";
const Page = () => {
  const { showModal } = useModal();
  const [Rooms, setRooms] = useState<IRoomsManagementTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.get(`/rooms/get-rooms`, {
        headers: {
          Authorization: getToken() || "",
        },
      });
      setRooms(response.data);
      console.log(Rooms);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const onUpdate = async () => {
    fetchRooms();
  };
  useEffect(() => {
    fetchRooms();
  }, []);
  const addRoom = () => {
    showModal(<AddRoomModal />, "Add Room", (result) => {
      if (result) {
        console.log(result, "123");
        fetchRooms();
      }
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center ">
        <h3 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-primary md:text-4xl">
          Rooms Management
        </h3>
        <div className="flex gap-x-4">
          <Button
            variant="default"
            className="bg-primary text-background"
            onClick={() => addRoom()}
          >
            Add Rooms
          </Button>
        </div>
      </div>
      <RoomsManagementTable
        onUpdate={onUpdate}
        rooms={Rooms}
        loading={isLoading}
        error={isError}
      />
    </div>
  );
};

export default Page;
