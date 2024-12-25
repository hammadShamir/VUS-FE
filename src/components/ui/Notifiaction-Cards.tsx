"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Info, Calendar, CheckCheck } from "lucide-react";
import { Button } from "./button";
import { NotificationCardProps } from "@/interfaces/notifications";

export function NotificationCard({
  type,
  title,
  message,
  time,
  key,
  onClose,
}: NotificationCardProps) {
  const iconMap: any = {
    success: <CheckCircle className="h-6 w-6 text-green-600" />,
    danger: <XCircle className="h-6 w-6 text-red-600" />,
    booking: <Calendar className="h-6 w-6 text-blue-600" />,
    default: <Info className="h-6 w-6 text-gray-600" />,
  };

  const borderColorMap: any = {
    success: "border-green-300",
    danger: "border-red-300",
    booking: "border-blue-300",
    default: "border-gray-300",
  };

  return (
    <Card
      key={key}
      className={`mb-4 border group/item ${borderColorMap[type]} bg-accentColor relative hover:shadow-md hover:ring-1 hover:ring-gray-300 transition-shadow duration-200`}
    >
      <CardContent className="flex items-start p-4 ">
        <div className="mr-4 mt-1">{iconMap[type]}</div>
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
