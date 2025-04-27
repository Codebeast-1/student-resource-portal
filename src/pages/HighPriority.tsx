
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RequestDetails from '@/components/RequestDetails';
import { toast } from 'sonner';

// Define the RequestType to properly handle status
type RequestStatus = 'pending' | 'approved' | 'rejected';

interface RequestType {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  time: string;
  requestedBy: string;
  status: RequestStatus;
  facultyRecommendation: boolean;
}

const HighPriority: React.FC = () => {
  // Mock data for high priority requests (those with faculty recommendation)
  const [highPriorityRequests, setHighPriorityRequests] = useState<RequestType[]>([
    {
      id: '1',
      title: 'Tech Club Weekly Meeting',
      description: 'Regular weekly meeting for the Technology Club members to discuss ongoing projects and upcoming events.',
      venue: 'Classroom 101',
      date: 'May 12, 2025',
      time: '15:45 - 17:15',
      requestedBy: 'John Doe (Student)',
      status: 'pending',
      facultyRecommendation: true
    },
    {
      id: '2',
      title: 'Cultural Club Performance',
      description: 'Annual cultural showcase featuring performances from various college cultural clubs.',
      venue: 'Lecture Theater 2',
      date: 'May 25, 2025',
      time: '17:00 - 20:00',
      requestedBy: 'Cultural Committee',
      status: 'pending',
      facultyRecommendation: true
    },
    {
      id: '3',
      title: 'Industry Guest Lecture',
      description: 'Special lecture on "Future of AI in Industry" by the CEO of Tech Solutions Inc.',
      venue: 'Lecture Theater 1',
      date: 'May 18, 2025',
      time: '11:30 - 13:00',
      requestedBy: 'Prof. Williams',
      status: 'pending',
      facultyRecommendation: true
    }
  ]);

  const handleStatusChange = (id: string, status: 'approved' | 'rejected', comment: string) => {
    // Update high priority requests with proper type handling
    setHighPriorityRequests(highPriorityRequests.map(request => 
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
            <h1 className="text-2xl font-bold">High Priority Requests</h1>
            <p className="text-muted-foreground">
              Faculty recommended and urgent booking requests
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Faculty Recommended Requests</CardTitle>
              <CardDescription>
                These requests have been recommended by faculty members and should be reviewed promptly
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {highPriorityRequests.length > 0 ? (
                <div className="space-y-4">
                  {highPriorityRequests.map(request => (
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
                  No high priority requests at the moment.
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default HighPriority;
