
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

interface AuthFormProps {
  onSuccess?: (userType: 'admin' | 'user') => void;
}

type AuthUser = {
  email: string;
  name: string;
  password: string;
  type: 'admin' | 'user';
};

const AUTHORIZED_USERS: AuthUser[] = [
  {
    email: 'xyz@example.com',
    name: 'Student_1',
    password: '1234',
    type: 'user'
  },
  {
    email: 'fac@example.com',
    name: 'Faculty_1',
    password: '2102',
    type: 'user'
  },
  {
    email: 'admin@example.com',
    name: 'Admin_1',
    password: '2005',
    type: 'admin'
  }
];

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = AUTHORIZED_USERS.find(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      user.password === password
    );
    
    if (user) {
      try {
        // Log the login attempt in our database
        const { error: loginError } = await supabase
          .from('login_history')
          .insert([
            {
              user_email: user.email,
              user_type: user.type,
              name: user.name
            }
          ]);

        if (loginError) {
          console.error('Error logging login:', loginError);
        }

        toast.success(`Welcome back, ${user.name}!`);
        if (onSuccess) {
          onSuccess(user.type);
        } else {
          navigate(`/dashboard/${user.type}`);
        }
      } catch (err) {
        console.error('Error during login:', err);
        toast.error('An error occurred during login.');
      }
    } else {
      toast.error('Access denied. Please check your email and password.');
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
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
