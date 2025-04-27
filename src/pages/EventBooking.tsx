import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const EventBooking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('club');
  const [eventType, setEventType] = useState<string>('');
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [attendees, setAttendees] = useState('');
  const [facultyRecommendation, setFacultyRecommendation] = useState<boolean>(false);
  const [notifyYear, setNotifyYear] = useState<string[]>([]);

  const clubEventTypes = [
    { id: 'technical', label: 'Technical Event', description: 'Workshops, hackathons, coding competitions' },
    { id: 'cultural', label: 'Cultural Event', description: 'Music, dance, art performances' },
    { id: 'seminar', label: 'Seminar/Talk', description: 'Guest lectures, panel discussions' },
  ];

  const departmentEventTypes = [
    { id: 'conference', label: 'Conference', description: 'Academic conferences, symposiums' },
    { id: 'workshop', label: 'Workshop', description: 'Departmental workshops and training' },
    { id: 'orientation', label: 'Orientation/Induction', description: 'New batch orientations' },
  ];

  const clubVenues = [
    { id: 'lt', label: 'Lecture Theater', capacity: 150 },
    { id: 'cr', label: 'Classroom', capacity: 40 },
    { id: 'cl', label: 'Collaboration Space', capacity: 60 },
  ];

  const departmentVenues = [
    { id: 'mph', label: 'Multi-Purpose Hall', capacity: 500 },
    { id: 'lt', label: 'Lecture Theater', capacity: 150 },
    { id: 'cr', label: 'Classroom', capacity: 40 },
    { id: 'cl', label: 'Collaboration Space', capacity: 60 },
  ];

  const yearOptions = [
    { id: 'first', label: '1st Year' },
    { id: 'second', label: '2nd Year' },
    { id: 'third', label: '3rd Year' },
    { id: 'fourth', label: '4th Year' },
    { id: 'pg', label: 'Postgraduate' },
  ];

  const handleVenueToggle = (venueId: string) => {
    setSelectedVenues(prev => 
      prev.includes(venueId)
        ? prev.filter(id => id !== venueId)
        : [...prev, venueId]
    );
  };

  const handleYearToggle = (yearId: string) => {
    setNotifyYear(prev => 
      prev.includes(yearId)
        ? prev.filter(id => id !== yearId)
        : [...prev, yearId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!eventType || selectedVenues.length === 0 || !eventName || !eventDate || 
        !eventStartTime || !eventEndTime || !attendees || !eventDescription) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    toast.success('Event booking request submitted successfully');
    
    // Reset form
    setEventType('');
    setSelectedVenues([]);
    setEventName('');
    setEventDescription('');
    setEventDate('');
    setEventStartTime('');
    setEventEndTime('');
    setAttendees('');
    setFacultyRecommendation(false);
    setNotifyYear([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header userType="user" />
      
      <div className="flex-1 flex">
        <Sidebar userType="user" />
        
        <main className="flex-1 p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Event Booking</h1>
            <p className="text-muted-foreground">
              Book venues for club events and department functions
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="club">Club Event</TabsTrigger>
              <TabsTrigger value="department">Department Event</TabsTrigger>
            </TabsList>
            
            <TabsContent value="club">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Club Event Booking</CardTitle>
                    <CardDescription>
                      For events with 100+ participants organized by college clubs
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Event Type</Label>
                      <RadioGroup 
                        value={eventType} 
                        onValueChange={setEventType}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        {clubEventTypes.map(type => (
                          <div key={type.id} className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={type.id} id={`event-type-${type.id}`} />
                              <Label htmlFor={`event-type-${type.id}`} className="font-medium">{type.label}</Label>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6">{type.description}</p>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="mb-2 block">Required Venues</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {clubVenues.map(venue => (
                          <div key={venue.id} className="flex items-start space-x-2">
                            <Checkbox 
                              id={`venue-${venue.id}`} 
                              checked={selectedVenues.includes(venue.id)}
                              onCheckedChange={() => handleVenueToggle(venue.id)}
                            />
                            <div className="space-y-1">
                              <Label htmlFor={`venue-${venue.id}`} className="font-medium">{venue.label}</Label>
                              <p className="text-xs text-muted-foreground">Capacity: {venue.capacity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-name">Event Name</Label>
                        <Input 
                          id="event-name" 
                          value={eventName}
                          onChange={e => setEventName(e.target.value)}
                          placeholder="Enter event name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="attendees">Expected Attendees</Label>
                        <Input 
                          id="attendees" 
                          type="number"
                          value={attendees}
                          onChange={e => setAttendees(e.target.value)}
                          placeholder="Number of people attending"
                          min="1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-date">Date</Label>
                        <Input 
                          id="event-date" 
                          type="date"
                          value={eventDate}
                          onChange={e => setEventDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input 
                          id="start-time" 
                          type="time"
                          value={eventStartTime}
                          onChange={e => setEventStartTime(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-time">End Time</Label>
                        <Input 
                          id="end-time" 
                          type="time"
                          value={eventEndTime}
                          onChange={e => setEventEndTime(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="event-description">Event Description</Label>
                      <Textarea 
                        id="event-description"
                        value={eventDescription}
                        onChange={e => setEventDescription(e.target.value)}
                        placeholder="Describe the event and its requirements"
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="faculty-recommendation"
                          checked={facultyRecommendation}
                          onCheckedChange={(checked) => setFacultyRecommendation(!!checked)}
                        />
                        <Label htmlFor="faculty-recommendation">This event has faculty recommendation</Label>
                      </div>
                      <p className="text-xs text-muted-foreground ml-6">
                        Events with faculty recommendation may get priority approval
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="mb-2 block">Notify Students</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Select which year students should be notified about this event
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {yearOptions.map(year => (
                          <div key={year.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`year-${year.id}`} 
                              checked={notifyYear.includes(year.id)}
                              onCheckedChange={() => handleYearToggle(year.id)}
                            />
                            <Label htmlFor={`year-${year.id}`}>{year.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button type="submit" className="ml-auto">Submit Request</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="department">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Department Event Booking</CardTitle>
                    <CardDescription>
                      For larger events with 500+ participants organized by departments
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Event Type</Label>
                      <RadioGroup 
                        value={eventType} 
                        onValueChange={setEventType}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        {departmentEventTypes.map(type => (
                          <div key={type.id} className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={type.id} id={`dept-event-type-${type.id}`} />
                              <Label htmlFor={`dept-event-type-${type.id}`} className="font-medium">{type.label}</Label>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6">{type.description}</p>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="mb-2 block">Required Venues</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {departmentVenues.map(venue => (
                          <div key={venue.id} className="flex items-start space-x-2">
                            <Checkbox 
                              id={`dept-venue-${venue.id}`} 
                              checked={selectedVenues.includes(venue.id)}
                              onCheckedChange={() => handleVenueToggle(venue.id)}
                            />
                            <div className="space-y-1">
                              <Label htmlFor={`dept-venue-${venue.id}`} className="font-medium">{venue.label}</Label>
                              <p className="text-xs text-muted-foreground">Capacity: {venue.capacity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Other form fields remain the same as club events */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dept-event-name">Event Name</Label>
                        <Input 
                          id="dept-event-name" 
                          value={eventName}
                          onChange={e => setEventName(e.target.value)}
                          placeholder="Enter event name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dept-attendees">Expected Attendees</Label>
                        <Input 
                          id="dept-attendees" 
                          type="number"
                          value={attendees}
                          onChange={e => setAttendees(e.target.value)}
                          placeholder="Number of people attending"
                          min="1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dept-event-date">Date</Label>
                        <Input 
                          id="dept-event-date" 
                          type="date"
                          value={eventDate}
                          onChange={e => setEventDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dept-start-time">Start Time</Label>
                        <Input 
                          id="dept-start-time" 
                          type="time"
                          value={eventStartTime}
                          onChange={e => setEventStartTime(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dept-end-time">End Time</Label>
                        <Input 
                          id="dept-end-time" 
                          type="time"
                          value={eventEndTime}
                          onChange={e => setEventEndTime(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dept-event-description">Event Description</Label>
                      <Textarea 
                        id="dept-event-description"
                        value={eventDescription}
                        onChange={e => setEventDescription(e.target.value)}
                        placeholder="Describe the event and its requirements"
                        rows={4}
                      />
                    </div>
                    
                    {/* Notification settings for department events */}
                    <div className="space-y-2">
                      <Label className="mb-2 block">Notify Students</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Select which year students should be notified about this event
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {yearOptions.map(year => (
                          <div key={year.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`dept-year-${year.id}`} 
                              checked={notifyYear.includes(year.id)}
                              onCheckedChange={() => handleYearToggle(year.id)}
                            />
                            <Label htmlFor={`dept-year-${year.id}`}>{year.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button type="submit" className="ml-auto">Submit Request</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default EventBooking;
