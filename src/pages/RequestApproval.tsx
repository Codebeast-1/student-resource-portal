
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RequestDetails from '@/components/RequestDetails';
import { toast } from 'sonner';

const RequestApproval: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ltcr');
  
  // Mock data for LT/CR booking requests
  const [ltcrRequests, setLtcrRequests] = useState([
    {
      id: '1',
      title: 'Database Systems Lecture',
      description: 'Regular lecture for CS301 Database Systems course.',
      venue: 'Lecture Theater 1',
      date: 'May 10, 2025',
      time: '09:45 - 11:15',
      requestedBy: 'Prof. Smith',
      status: 'pending' as const
    },
    {
      id: '2',
      title: 'Tech Club Weekly Meeting',
      description: 'Regular weekly meeting for the Technology Club members to discuss ongoing projects and upcoming events.',
      venue: 'Classroom 101',
      date: 'May 12, 2025',
      time: '15:45 - 17:15',
      requestedBy: 'John Doe (Student)',
      status: 'pending' as const,
      facultyRecommendation: true
    },
    {
      id: '3',
      title: 'Programming Workshop',
      description: 'Hands-on workshop on web development basics for beginners.',
      venue: 'Computer Lab 103',
      date: 'May 15, 2025',
      time: '14:00 - 17:15',
      requestedBy: 'Jane Smith (Student)',
      status: 'pending' as const
    }
  ]);
  
  // Mock data for Event booking requests
  const [eventRequests, setEventRequests] = useState([
    {
      id: '4',
      title: 'Annual Tech Symposium',
      description: 'Annual technical symposium featuring keynote speakers, panel discussions, and student project showcases.',
      venue: 'Multi-Purpose Hall',
      date: 'May 20, 2025',
      time: '09:00 - 18:00',
      requestedBy: 'Computer Science Department',
      status: 'pending' as const
    },
    {
      id: '5',
      title: 'Cultural Club Performance',
      description: 'Annual cultural showcase featuring performances from various college cultural clubs.',
      venue: 'Lecture Theater 2',
      date: 'May 25, 2025',
      time: '17:00 - 20:00',
      requestedBy: 'Cultural Committee',
      status: 'pending' as const,
      facultyRecommendation: true
    }
  ]);

  const handleStatusChange = (id: string, status: 'approved' | 'rejected', comment: string) => {
    // Update LT/CR requests
    setLtcrRequests(ltcrRequests.map(request => 
      request.id === id ? { ...request, status } : request
    ));
    
    // Update Event requests
    setEventRequests(eventRequests.map(request => 
      request.id === id ? { ...request, status } : request
    ));
    
    toast.success(`Request ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
    
    // In a real application, you would send the status change and comment to an API
    console.log(`Request ${id} ${status} with comment: ${comment}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header userType="admin" />
      
      <div className="flex-1 flex">
        <Sidebar userType="admin" />
        
        <main className="flex-1 p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Request Approval</h1>
            <p className="text-muted-foreground">
              Review and manage booking requests
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="ltcr">LT/CR Bookings ({ltcrRequests.length})</TabsTrigger>
              <TabsTrigger value="event">Event Bookings ({eventRequests.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ltcr">
              <Card>
                <CardHeader>
                  <CardTitle>Lecture Theater & Classroom Booking Requests</CardTitle>
                </CardHeader>
                
                <CardContent>
                  {ltcrRequests.length > 0 ? (
                    <div className="space-y-4">
                      {ltcrRequests.map(request => (
                        <RequestDetails
                          key={request.id}
                          id={request.id}
                          title={request.title}
                          description={request.description}
                          venue={request.venue}
                          date={request.date}
                          time={request.time}
                          requestedBy={request.requestedBy}
                          status={request.status}
                          facultyRecommendation={request.facultyRecommendation}
                          isAdmin={true}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      No pending LT/CR booking requests to review.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="event">
              <Card>
                <CardHeader>
                  <CardTitle>Event Booking Requests</CardTitle>
                </CardHeader>
                
                <CardContent>
                  {eventRequests.length > 0 ? (
                    <div className="space-y-4">
                      {eventRequests.map(request => (
                        <RequestDetails
                          key={request.id}
                          id={request.id}
                          title={request.title}
                          description={request.description}
                          venue={request.venue}
                          date={request.date}
                          time={request.time}
                          requestedBy={request.requestedBy}
                          status={request.status}
                          facultyRecommendation={request.facultyRecommendation}
                          isAdmin={true}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      No pending event booking requests to review.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default RequestApproval;
