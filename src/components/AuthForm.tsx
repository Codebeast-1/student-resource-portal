
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthFormProps {
  onSuccess?: (userType: 'admin' | 'user') => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [userType, setUserType] = useState<'admin' | 'user'>('user');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally validate credentials against an API
    // For demo purposes, we'll just simulate a successful login
    toast.success(`Logged in successfully as ${userType}`);
    if (onSuccess) {
      onSuccess(userType);
    } else {
      navigate(`/dashboard/${userType}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Digital Permission System</CardTitle>
        <CardDescription className="text-center">Manage hall and event bookings</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" placeholder="your@email.com" className="auth-input" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input id="password" type="password" placeholder="••••••••" className="auth-input" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="userType" className="text-sm font-medium">Login as</label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={userType === 'user' ? 'default' : 'outline'}
                onClick={() => setUserType('user')}
                className="w-full"
              >
                User
              </Button>
              <Button
                type="button"
                variant={userType === 'admin' ? 'default' : 'outline'}
                onClick={() => setUserType('admin')}
                className="w-full"
              >
                Admin
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
