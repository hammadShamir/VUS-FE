"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useModal } from "@/context/Modal";
import {
  IAdminRoomsManagementTable,
  IRoomsManagementTable,
} from "@/interfaces";
import { CalendarClock, Pencil, Trash2 } from "lucide-react";
import AddRoomModal from "./modal-components/Add-Update-Room-Modal";
import { axiosService } from "@/services/axios";
import { useRouter } from "next/navigation";
const RoomsManagementTable: React.FC<IAdminRoomsManagementTable> = (props) => {
  const { showModal } = useModal();
  const navigate = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Rooms based on search term
  const filteredRooms = props.rooms.filter((room) =>
    Object.values(room).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const EditRoomsModal = (Room: IRoomsManagementTable) => {
    showModal(<AddRoomModal room={Room} />, "Edit Room Details", (result) => {
      if (result) {
        props.onUpdate();
      }
    });
  };
  const deleteRoom = async (roomId: string) => {
    await axiosService.delete(`/rooms/delete-room/${roomId}`);
    props.onUpdate();
  };
  const addRoomPriceSchedule = (roomId: string) => {
    navigate.push(`/admin/room-schedule-price/${roomId}`);
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search Rooms..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm px-4"
      />
      <div className="rounded-md border overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Room Include</TableHead>
                <TableHead>Default Price</TableHead>
                <TableHead>People</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.error ? (
                <span>Error</span>
              ) : props.loading ? (
                <span>Loading...</span>
              ) : !filteredRooms.length ? (
                <TableRow>
                  <TableCell className="font-medium" colSpan={5}>
                    <h3 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-primary md:text-4xl text-center w-full">
                      No Rooms Available
                    </h3>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRooms.map((room, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{room.label}</TableCell>
                    <TableCell>{room.roomsCount}</TableCell>
                    <TableCell>{room.defaultPrice}</TableCell>
                    <TableCell>{room.people}</TableCell>
                    <TableCell className="flex  items-center space-x-2">
                      {" "}
                      <Pencil
                        className="h-4 w-4"
                        onClick={() => EditRoomsModal(room)}
                      />{" "}
                      <Trash2
                        className="h-4 w-4"
                        onClick={() => deleteRoom(room._id as string)}
                      />
                      <CalendarClock
                        className="h-4 w-4"
                        onClick={() => addRoomPriceSchedule(room._id as string)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RoomsManagementTable;
