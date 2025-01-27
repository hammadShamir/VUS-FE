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
import { Pencil } from "lucide-react";
import AddRoomModal from "./modal-components/Add-Update-Room-Modal";
const RoomsManagementTable: React.FC<IAdminRoomsManagementTable> = (props) => {
  const { showModal } = useModal();
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
                <TableHead>Price</TableHead>
                <TableHead>Adults</TableHead>
                <TableHead>Children</TableHead>
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
                    <TableCell>{room.price}</TableCell>
                    <TableCell>{room.adults}</TableCell>
                    <TableCell>{room.children}</TableCell>
                    <TableCell>
                      {" "}
                      <Pencil
                        className="h-5 w-5"
                        onClick={() => EditRoomsModal(room)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
};

export default RoomsManagementTable;
