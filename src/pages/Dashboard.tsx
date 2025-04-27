
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const { userType = 'user' } = useParams<{ userType?: 'admin' | 'user' }>();
  const navigate = useNavigate();
  
  const isAdmin = userType === 'admin';
  
  const recentRequests = isAdmin ? [
    { id: '1', title: 'Club Event in LT1', status: 'pending', date: '2025-05-02' },
    { id: '2', title: 'Department Conference', status: 'pending', date: '2025-05-05' },
    { id: '3', title: 'Technical Workshop', status: 'approved', date: '2025-05-10' },
  ] : [
    { id: '1', title: 'Tech Club Meeting', status: 'pending', date: '2025-05-03' },
    { id: '2', title: 'Project Presentation', status: 'approved', date: '2025-05-07' },
  ];
  
  const stats = isAdmin ? [
    { label: 'Pending Approvals', value: '12', color: 'bg-yellow-100 text-yellow-800' },
    { label: 'High Priority', value: '3', color: 'bg-red-100 text-red-800' },
    { label: 'This Week', value: '28', color: 'bg-blue-100 text-blue-800' },
    { label: 'Total Spaces', value: '18', color: 'bg-green-100 text-green-800' },
  ] : [
    { label: 'Active Bookings', value: '2', color: 'bg-green-100 text-green-800' },
    { label: 'Pending Requests', value: '1', color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Past Bookings', value: '5', color: 'bg-blue-100 text-blue-800' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header userType={userType as 'admin' | 'user'} />
      
      <div className="flex-1 flex">
        <Sidebar userType={userType as 'admin' | 'user'} />
        
        <main className="flex-1 p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {isAdmin 
                ? 'Manage booking requests and approvals' 
                : 'Manage your booking requests and activities'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="py-3">
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className="text-2xl">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-2">
                  <div className={`h-1 w-full ${stat.color} rounded`}></div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{isAdmin ? 'Recent Requests' : 'Your Requests'}</CardTitle>
                  <CardDescription>
                    {isAdmin 
                      ? 'Most recent booking requests requiring attention' 
                      : 'Status of your recent booking requests'}
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate(isAdmin ? '/request-approval' : '/activities')}
                >
                  View all
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div 
                      key={request.id} 
                      className="flex items-center justify-between border-b border-border last:border-0 pb-3 last:pb-0"
                    >
                      <div>
                        <div className="font-medium">{request.title}</div>
                        <div className="text-sm text-muted-foreground">{request.date}</div>
                      </div>
                      <div className={`text-sm px-2 py-1 rounded-full 
                        ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          request.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  {isAdmin 
                    ? 'Manage requests and system access' 
                    : 'Create new booking requests'}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {isAdmin ? (
                  <>
                    <Button 
                      onClick={() => navigate('/request-approval')}
                      className="w-full justify-start"
                    >
                      Review Pending Requests
                    </Button>
                    <Button 
                      onClick={() => navigate('/high-priority')}
                      className="w-full justify-start"
                      variant="secondary"
                    >
                      Check High Priority Requests
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={() => navigate('/ltcr-booking')}
                      className="w-full justify-start"
                    >
                      Book Lecture Theater/Classroom
                    </Button>
                    <Button 
                      onClick={() => navigate('/event-booking')}
                      className="w-full justify-start"
                      variant="secondary"
                    >
                      Book Event Space
                    </Button>
                  </>
                )}
                <Button 
                  onClick={() => navigate('/contact-us')}
                  className="w-full justify-start"
                  variant="outline"
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
