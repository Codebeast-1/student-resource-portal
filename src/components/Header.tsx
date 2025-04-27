import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BellIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
interface HeaderProps {
  userType: 'admin' | 'user';
}
const Header: React.FC<HeaderProps> = ({
  userType
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };
  return <header className="bg-white border-b border-gray-200 shadow-sm py-3">
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-brand-900">SmartCampus</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')} className="relative">
            <BellIcon className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center">
              3
            </Badge>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-sm font-medium">XYZ</div>
              <div className="text-xs text-gray-500 capitalize">{userType}</div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;