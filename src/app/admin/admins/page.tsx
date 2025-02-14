"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { axiosService } from "@/services/axios";
import { getToken } from "@/services/helper";

import { IAdminManagementTable } from "@/interfaces";
import AdminManagementTable from "@/components/AdminTable";
import AdminModalForm from "@/components/modal-components/Add-Admin-Modal";
import { useModal } from "@/context/Modal";
import { status as UserStatus } from "@/interfaces";
const Page = () => {
  const { showModal } = useModal();
  const [admins, setadmins] = useState<IAdminManagementTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const fetchadmins = async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.get(
        `/get-sub-admins${
          status ? `?isActive=${status === UserStatus.active}` : ""
        }`,
        {
          headers: {
            Authorization: getToken() || "",
          },
        }
      );
      setadmins(response.data);
      console.log(admins);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const onUpdate = async () => {
    fetchadmins();
  };
  useEffect(() => {
    fetchadmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const addAdmin = () => {
    showModal(<AdminModalForm />, "Add Sub Admin", (result) => {
      if (result) {
        console.log(result, "123");
        fetchadmins();
      }
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row gap-y-3 justify-between items-center">
        <h3 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-primary md:text-4xl">
          Admins
        </h3>
        <div className="flex lg:block space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Status
                <ChevronDown className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setStatus("")}>
                  All
                </DropdownMenuItem>
                {[...Object.values(UserStatus)].map((item, index) => {
                  return (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => setStatus(item)}
                    >
                      <span>{item}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={addAdmin}
            variant="default"
            className="bg-primary text-background"
          >
            Add Admin
          </Button>
        </div>
      </div>
      <AdminManagementTable
        admins={admins}
        loading={isLoading}
        error={isError}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default Page;
