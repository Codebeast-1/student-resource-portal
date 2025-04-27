
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userType: 'admin' | 'user';
}

const Sidebar: React.FC<SidebarProps> = ({ userType }) => {
  const location = useLocation();
  
  const userLinks = [
    { href: `/dashboard/${userType}`, label: 'Dashboard', exact: true },
    { href: '/ltcr-booking', label: 'LT/CR Booking' },
    { href: '/event-booking', label: 'Event Booking' },
    { href: '/activities', label: 'Activities' },
    { href: '/notifications', label: 'Notifications' },
    { href: '/contact-us', label: 'Contact Us' },
  ];
  
  const adminLinks = [
    { href: `/dashboard/${userType}`, label: 'Dashboard', exact: true },
    { href: '/request-approval', label: 'Request Approval' },
    { href: '/high-priority', label: 'High Priority' },
    { href: '/notifications', label: 'Notifications' },
    { href: '/contact-us', label: 'Contact Us' },
  ];
  
  const links = userType === 'admin' ? adminLinks : userLinks;

  return (
    <aside className="bg-sidebar w-64 min-h-screen border-r border-border flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-medium text-sidebar-foreground">
          {userType === 'admin' ? 'Admin Panel' : 'User Portal'}
        </h2>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map((link) => {
          const isActive = link.exact 
            ? location.pathname === link.href 
            : location.pathname.startsWith(link.href);
            
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Digital Permission System
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
