
import React from 'react';
import { Bell, Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  onClick?: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  title,
  message,
  time,
  type,
  read,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div 
      className={cn(
        "p-4 border-b border-border cursor-pointer hover:bg-gray-50 transition-colors",
        !read && "bg-blue-50"
      )}
      onClick={handleClick}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-1">
          {type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
          {type === 'success' && <Check className="h-5 w-5 text-green-500" />}
          {type === 'warning' && <Bell className="h-5 w-5 text-orange-500" />}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h4 className={cn("text-sm font-medium", !read && "font-semibold")}>{title}</h4>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
