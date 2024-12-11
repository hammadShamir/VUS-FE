"use client";
import { BookingsList } from "@/components/BookingList";
import { DashboardSidebar } from "@/components/common/Dashboard-Sidebar";
import Header2 from "@/components/common/Header/Header2";
import isAuth from "@/services/isAuth";
import * as React from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const Page = () => {
  const isInitialRender = React.useRef(true);
  const checkForMessage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const message = searchParams.get("message");
    if (message) {
      toast.success(message);
      searchParams.delete("message");
      const newUrl = searchParams.toString()
        ? `${window.location.pathname}?${searchParams.toString()}`
        : window.location.pathname;

      window.history.replaceState(null, "", newUrl);
    }
  };

  React.useEffect(() => {
    if (isInitialRender.current) {
      checkForMessage();
      isInitialRender.current = false;
    }
  }, []);
  return <BookingsList />;
};

export default isAuth(Page);
