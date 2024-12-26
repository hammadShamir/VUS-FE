'use client';
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

import { Button } from '@/components/ui/button';
import { BookingStatus } from '../../../../public/assets/data/Booking';
import { IBooking } from '@/interfaces';
import { axiosService } from '@/services/axios';
import { getToken } from '@/services/helper';
const Page = () => {
    const [bookings, setBookings] = useState<IBooking[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('Pending');
    const fetchBookings = async () => {
        try {
            setIsLoading(true);
            const response = await axiosService.get(`get-all-bookings?status=${status}`, {
                headers: {
                    Authorization: getToken() || "",
                },
            });
            setBookings(response.data);
        } catch (error) {
            console.log(error)
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchBookings();
    }, [status])
    console.log(bookings)
    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <h3 className='font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-primary md:text-4xl'>Bookings</h3>
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
                            {BookingStatus.map((item, index) => {
                                return (
                                    <DropdownMenuItem key={index} onClick={() => setStatus(item)}>
                                        <span>{item}</span>
                                    </DropdownMenuItem>
                                )
                            })}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Page
