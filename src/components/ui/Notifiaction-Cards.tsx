"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Info, Calendar, CheckCheck } from "lucide-react";
import { NotificationCardProps } from "@/interfaces/notifications";
import { NotificationStatus } from "@/interfaces";
import { ReactNode } from "react";

export function NotificationCard({
  type,
  title,
  message,
  time,
  key,
  onClose,
}: NotificationCardProps) {
  const iconMap: Record<NotificationStatus, ReactNode> = {
    success: <CheckCircle className="h-6 w-6 text-green-600" />,
    danger: <XCircle className="h-6 w-6 text-red-600" />,
    booking: <Calendar className="h-6 w-6 text-blue-600" />,
    default: <Info className="h-6 w-6 text-gray-600" />,
  };

  const borderColorMap: Record<NotificationStatus, string> = {
    success: "border-green-300",
    danger: "border-red-300",
    booking: "border-blue-300",
    default: "border-gray-300",
  };
  const icon = iconMap[type as NotificationStatus] || iconMap.default;
  const borderColor =
    borderColorMap[type as NotificationStatus] || borderColorMap.default;
  return (
    <Card
      key={key}
      className={`mb-4 border group/item ${borderColor} dark:bg-accentColor relative hover:shadow-md hover:ring-1 hover:ring-gray-300 transition-shadow duration-200`}
    >
      <CardContent className="flex items-start p-4 ">
        <div className="mr-4 mt-1">{icon}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-primary ">{title}</h3>
          </div>
          <p className="text-sm text-primary mb-2">{message}</p>
          <p className="text-xs text-primary">{time}</p>
        </div>
        {onClose && (
          <div onClick={onClose}>
            <CheckCheck className="absolute group/edit  h-8 w-8 border-0 invisible block top-2 right-2 p-1 rounded-full text-primary  group-hover/item:visible" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
