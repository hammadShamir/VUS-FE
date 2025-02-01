"use client";

import { cn } from "@/lib/utils";
import { UserIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  adminDashboardMenus,
  userDashboardMenus,
} from "../../../public/assets/data/MenuLinks";
import { useEffect, useState } from "react";
import { DashboardMenuItem, UserRoles } from "@/interfaces";
import { getUser, logout } from "@/services/helper";

export function DashboardSidebar() {
  const [MenuLinks, SetMenuLinks] = useState<DashboardMenuItem[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const userSession = Cookies.get("user");
  const user = userSession && JSON.parse(userSession);
  const role = getUser().role;

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (role === UserRoles.USER) {
      SetMenuLinks(userDashboardMenus);
    } else if (role === UserRoles.ADMIN || role === UserRoles.SUB_ADMIN) {
      SetMenuLinks(adminDashboardMenus);
    }
  }, []);
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex md:w-64 md:flex-col md:bg-primary md:min-h-screen fixed top-[64px]">
        <div className="flex flex-col items-center p-4 border-b border-white/10 text-background">
          <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <UserIcon className="h-10 w-10 text-white/60" />
          </div>
          <h3>{user?.fullName}</h3>
          <span>{user?.email}</span>
        </div>
        <div className="flex-1 space-y-1 p-4">
          {MenuLinks.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Button
                key={item.href}
                variant="ghost"
                asChild
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "cursor-pointer w-full justify-start gap-4 px-4 ",
                  isActive && "bg-background text-primary",
                  !isActive && "text-background",
                  item.href == "/admin/admins" &&
                  role !== UserRoles.ADMIN &&
                  "hidden"
                )}
              >
                <span>
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </span>
              </Button>
            );
          })}
          <Button
            variant="ghost"
            asChild
            onClick={handleLogout}
            className={cn(
              "cursor-pointer w-full justify-start gap-4 px-4 ",
              "text-background"
            )}
          >
            <span>
              <LogOutIcon className="h-5 w-5" />
              Log Out
            </span>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed md:hidden inset-x-0 bottom-0 z-50 h-16 bg-primary border-t border-white/10">
        <div className="flex h-full items-center justify-around px-4">
          {MenuLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center text-xs",
                  isActive ? "text-white" : "text-white/60"
                )}
              >
                <item.icon className="h-6 w-6 mb-1" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
