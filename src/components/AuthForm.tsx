
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthFormProps {
  onSuccess?: (userType: 'admin' | 'user') => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [activeTab, setActiveTab] = useState<string>('login');
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

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally create a new user via an API
    // For demo purposes, we'll just simulate a successful signup
    toast.success('Account created successfully');
    setActiveTab('login');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Digital Permission System</CardTitle>
          <CardDescription className="text-center">Manage hall and event bookings</CardDescription>
          <TabsList className="grid w-full grid-cols-2 mt-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        </CardHeader>
        
        <CardContent>
          <TabsContent value="login">
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
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input id="name" placeholder="John Doe" className="auth-input" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="signup-email" className="text-sm font-medium">Email</label>
                <Input id="signup-email" placeholder="your@email.com" className="auth-input" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="signup-password" className="text-sm font-medium">Password</label>
                <Input id="signup-password" type="password" placeholder="••••••••" className="auth-input" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
                <Input id="confirm-password" type="password" placeholder="••••••••" className="auth-input" required />
              </div>
              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
          </TabsContent>
        </CardContent>
        
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          {activeTab === 'login' ? (
            <p>Don't have an account? <button onClick={() => setActiveTab('signup')} className="text-primary underline">Sign up</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setActiveTab('login')} className="text-primary underline">Login</button></p>
          )}
        </CardFooter>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
