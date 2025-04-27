
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RequestDetails from '@/components/RequestDetails';

const Activities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('pending');
  
  // Mock data
  const pendingRequests = [
    {
      id: '1',
      title: 'Tech Club Weekly Meeting',
      description: 'Regular weekly meeting for the Technology Club members to discuss ongoing projects and upcoming events.',
      venue: 'Classroom 101',
      date: 'May 10, 2025',
      time: '15:45 - 17:15',
      requestedBy: 'John Doe',
      status: 'pending' as const,
      facultyRecommendation: true
    },
    {
      id: '2',
      title: 'Programming Workshop',
      description: 'Hands-on workshop on web development basics for beginners.',
      venue: 'Computer Lab 103',
      date: 'May 15, 2025',
      time: '14:00 - 17:15',
      requestedBy: 'John Doe',
      status: 'pending' as const
    }
  ];
  
  const approvedRequests = [
    {
      id: '3',
      title: 'Robotics Club Showcase',
      description: 'Annual showcase of robotics projects developed by club members.',
      venue: 'Lecture Theater 1',
      date: 'May 20, 2025',
      time: '11:30 - 15:30',
      requestedBy: 'John Doe',
      status: 'approved' as const
    },
    {
      id: '4',
      title: 'Group Study Session',
      description: 'Study group for the upcoming Database Systems exam.',
      venue: 'Classroom 102',
      date: 'May 5, 2025',
      time: '17:30 - 19:00',
      requestedBy: 'John Doe',
      status: 'approved' as const
    }
  ];
  
  const rejectedRequests = [
    {
      id: '5',
      title: 'Music Club Practice',
      description: 'Weekly practice session for the college music club.',
      venue: 'Lecture Theater 2',
      date: 'April 28, 2025',
      time: '17:30 - 19:00',
      requestedBy: 'John Doe',
      status: 'rejected' as const
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header userType="user" />
      
      <div className="flex-1 flex">
        <Sidebar userType="user" />
        
        <main className="flex-1 p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">My Activities</h1>
            <p className="text-muted-foreground">
              Track the status of your booking requests
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedRequests.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedRequests.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="space-y-4">
              {pendingRequests.length > 0 ? (
                pendingRequests.map(request => (
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
                    isAdmin={false}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  You don't have any pending requests.
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="approved" className="space-y-4">
              {approvedRequests.length > 0 ? (
                approvedRequests.map(request => (
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
                    isAdmin={false}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  You don't have any approved requests.
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="rejected" className="space-y-4">
              {rejectedRequests.length > 0 ? (
                rejectedRequests.map(request => (
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
                    isAdmin={false}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  You don't have any rejected requests.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Activities;
