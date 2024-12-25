export interface NotificationCardProps {
  type: string;
  title: string;
  message: string;
  time: string;
  key: number;
  onClose?: () => void;
}
