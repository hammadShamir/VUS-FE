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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Eye } from "lucide-react";
import {
  BookingStatus,
  IAdminManagementMainTable,
  IAdminManagementTable,
} from "@/interfaces"; // Assuming IUser interface exists for managing users
import { AdminDetailsModal } from "./modal-components/View-Admin-Modal";

import BookingStatusBadge from "./Booking-Status";
import { useModal } from "@/context/Modal";
const AdminManagementTable: React.FC<IAdminManagementMainTable> = (props) => {
  const { showModal } = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter users based on search term
  const filteredUsers = props.admins.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const ViewAdminModal = (admin: IAdminManagementTable) => {
    showModal(<AdminDetailsModal admin={admin} />, "View Details", (result) => {
      if (result) {
        props.onUpdate();
      }
    });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm px-4"
      />
      <div className="rounded-md border overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.error ? (
                <span>Error</span>
              ) : props.loading ? (
                <span>Loading...</span>
              ) : !currentUsers.length ? (
                <TableRow>
                  <TableCell className="font-medium" colSpan={5}>
                    <h3 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-primary md:text-4xl text-center w-full">
                      No Users Available
                    </h3>
                  </TableCell>
                </TableRow>
              ) : (
                currentUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      {user.fullName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      {user.isActive ? (
                        <BookingStatusBadge status={BookingStatus.active} />
                      ) : (
                        <BookingStatusBadge status={BookingStatus.inactive} />
                      )}
                    </TableCell>
                    <TableCell className="text-right flex items-center ">
                      {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateUserStatus(user._id, "Active")
                            }
                          >
                            Active
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateUserStatus(user._id, "Inactive")
                            }
                          >
                            In Active
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}
                      <Eye onClick={() => ViewAdminModal(user)} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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
      </div>
    </div>
  );
};

export default AdminManagementTable;
