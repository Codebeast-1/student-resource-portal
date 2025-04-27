
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthFormProps {
  onSuccess?: (userType: 'admin' | 'user') => void;
}

type AuthUser = {
  email: string;
  name: string;
  type: 'admin' | 'user';
};

const AUTHORIZED_USERS: AuthUser[] = [
  {
    email: 'xyz@example.com',
    name: 'Student_1',
    type: 'user'
  },
  {
    email: 'fac@example.com',
    name: 'Faculty_1',
    type: 'admin'
  }
];

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = AUTHORIZED_USERS.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      toast.success(`Welcome back, ${user.name}!`);
      if (onSuccess) {
        onSuccess(user.type);
      } else {
        navigate(`/dashboard/${user.type}`);
      }
    } else {
      toast.error('Access denied. Please check your email.');
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
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input" 
              required 
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
