import { useState } from "react";
import { NotificationCard } from "./ui/Notifiaction-Cards";

const initialNotifications = [
  {
    id: 1,
    type: "success",
    title: "Villa Booking Confirmed",
    message: "Your booking for 'Seaside Villa' has been confirmed.",
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "danger",
    title: "Booking Canceled",
    message: "Your booking for 'Mountain View Villa' has been canceled.",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "booking",
    title: "Upcoming Stay Reminder",
    message: "Your booking for 'Lakefront Villa' starts tomorrow.",
    time: "1 day ago",
  },
  {
    id: 5,
    type: "default",
    title: "New Feature",
    message:
      "We've just launched a new feature! Check it out in your dashboard.",
    time: "3 hours ago",
  },
  {
    id: 4,
    type: "default",
    title: "Reminder",
    message: "Don't forget to complete your daily tasks.",
    time: "Yesterday",
  },
];
export function NotificationsList() {
  // State for notifications
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };
  return (
    <div className="space-y-6 w-full p-4 md:ms-64 mt-20 mb-14 md:mb-0">
      <h1 className="text-2xl font-bold">Notifications:</h1>
      <div className="space-y-4">
        {!notifications.length ? (
          <div className="w-full text-center py-8">
            <span>No Notification Available.</span>
          </div>
        ) : (
          notifications?.map((notification) => (
            <NotificationCard
              key={notification.id}
              type={notification.type}
              title={notification.title}
              message={notification.message}
              time={notification.time}
              onClose={() => markAsRead(notification.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
