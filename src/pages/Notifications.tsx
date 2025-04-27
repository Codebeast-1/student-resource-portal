
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import NotificationItem from '@/components/NotificationItem';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Notifications: React.FC = () => {
  // This would normally fetch from an API
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Booking Approved',
      message: 'Your booking request for Lecture Theater 1 on May 20 has been approved.',
      time: '2 hours ago',
      type: 'success' as const,
      read: false
    },
    {
      id: '2',
      title: 'New Approval Request',
      message: 'A new booking request requires your approval.',
      time: '1 day ago',
      type: 'info' as const,
      read: false
    },
    {
      id: '3',
      title: 'Booking Request Rejected',
      message: 'Your request for Music Club Practice has been rejected. Please check comments for details.',
      time: '3 days ago',
      type: 'warning' as const,
      read: true
    },
    {
      id: '4',
      title: 'System Maintenance',
      message: 'The system will be undergoing maintenance on Sunday from 2 AM to 5 AM.',
      time: '1 week ago',
      type: 'info' as const,
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    toast.success('Notification marked as read');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast.success('All notifications marked as read');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header userType="user" />
      
      <div className="flex-1 flex">
        <Sidebar userType="user" />
        
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              <p className="text-muted-foreground">
                {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
              </p>
            </div>
            
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark All as Read
              </Button>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationItem 
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  message={notification.message}
                  time={notification.time}
                  type={notification.type}
                  read={notification.read}
                  onClick={markAsRead}
                />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No notifications to display.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
