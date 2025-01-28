"use client";
import { DashboardSidebar } from "@/components/common/Dashboard-Sidebar";
import Header2 from "@/components/common/Header/Header2";

import { Toaster } from "react-hot-toast";
import { NotificationsList } from "@/components/NotificationList";

const Page = () => {
  return (
    <main className="relative">
      <Header2 />
      <div className="flex h-full">
        <DashboardSidebar />
        <NotificationsList />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
};

export default Page;
