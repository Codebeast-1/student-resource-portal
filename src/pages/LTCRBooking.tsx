
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import BookingCard from '@/components/BookingCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const LTCRBooking: React.FC = () => {
  const [bookingDialog, setBookingDialog] = useState<{
    open: boolean;
    venue?: {
      id: string;
      title: string;
      capacity: number;
    };
  }>({ open: false });
  
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSlot, setBookingSlot] = useState('');
  const [purpose, setPurpose] = useState('');
  const [attendees, setAttendees] = useState('');
  
  const venues = [
    {
      id: 'lt1',
      title: 'Lecture Theater 1',
      description: 'Large theater with projector and sound system',
      capacity: 150,
      availableSlots: 5,
      totalSlots: 8,
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=300',
    },
    {
      id: 'lt2',
      title: 'Lecture Theater 2',
      description: 'Medium theater with interactive whiteboard',
      capacity: 120,
      availableSlots: 3,
      totalSlots: 8,
      image: 'https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop&w=300',
    },
    {
      id: 'cr1',
      title: 'Classroom 101',
      description: 'Standard classroom with projector',
      capacity: 40,
      availableSlots: 6,
      totalSlots: 10,
      image: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=300',
    },
    {
      id: 'cr2',
      title: 'Classroom 102',
      description: 'Standard classroom with smart board',
      capacity: 35,
      availableSlots: 4,
      totalSlots: 10,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=300',
    },
    {
      id: 'cr3',
      title: 'Classroom 103',
      description: 'Computer lab with 30 workstations',
      capacity: 30,
      availableSlots: 2,
      totalSlots: 8,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300',
    },
    {
      id: 'cr4',
      title: 'Classroom 104',
      description: 'Small room ideal for seminars',
      capacity: 20,
      availableSlots: 7,
      totalSlots: 10,
      image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=300',
    },
  ];

  const timeSlots = [
    '08:00 - 09:30',
    '09:45 - 11:15',
    '11:30 - 13:00',
    '14:00 - 15:30',
    '15:45 - 17:15',
    '17:30 - 19:00',
  ];

  const handleBook = (venue: any) => {
    setBookingDialog({
      open: true,
      venue,
    });
  };

  const handleSubmitBooking = () => {
    // Here you would typically send this data to an API
    toast.success('Booking request submitted successfully');
    setBookingDialog({ open: false });
    
    // Reset form
    setBookingDate('');
    setBookingSlot('');
    setPurpose('');
    setAttendees('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header userType="user" />
      
      <div className="flex-1 flex">
        <Sidebar userType="user" />
        
        <main className="flex-1 p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Lecture Theaters & Classrooms</h1>
            <p className="text-muted-foreground">
              Book lecture theaters and classrooms for your academic activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <BookingCard
                key={venue.id}
                title={venue.title}
                description={venue.description}
                capacity={venue.capacity}
                availableSlots={venue.availableSlots}
                totalSlots={venue.totalSlots}
                image={venue.image}
                onBook={() => handleBook(venue)}
              />
            ))}
          </div>
        </main>
      </div>
      
      <Dialog open={bookingDialog.open} onOpenChange={(open) => setBookingDialog({ open })}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book {bookingDialog.venue?.title}</DialogTitle>
            <DialogDescription>
              Fill out the details to submit your booking request
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="timeSlot">Time Slot</Label>
              <Select value={bookingSlot} onValueChange={setBookingSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Input
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g., Lecture, Meeting, Study Group"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="attendees">Expected Number of Attendees</Label>
              <Input
                id="attendees"
                type="number"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
                min="1"
                max={bookingDialog.venue?.capacity}
                required
              />
              <p className="text-xs text-muted-foreground">
                Max capacity: {bookingDialog.venue?.capacity} people
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingDialog({ open: false })}>
              Cancel
            </Button>
            <Button onClick={handleSubmitBooking}>
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LTCRBooking;
