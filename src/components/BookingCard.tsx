
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookingCardProps {
  title: string;
  description: string;
  capacity: number;
  availableSlots: number;
  totalSlots: number;
  image?: string;
  onBook: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  title,
  description,
  capacity,
  availableSlots,
  totalSlots,
  image = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=300",
  onBook,
}) => {
  const availabilityPercentage = Math.round((availableSlots / totalSlots) * 100);
  
  return (
    <Card className="overflow-hidden booking-card">
      <div className="relative h-40 w-full">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2">
          <Badge className="bg-white text-primary">
            Capacity: {capacity}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span>Available Slots</span>
          <span className="font-medium">{availableSlots}/{totalSlots}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              availabilityPercentage > 60 ? 'bg-green-500' :
              availabilityPercentage > 30 ? 'bg-yellow-500' : 
              'bg-red-500'
            }`}
            style={{ width: `${availabilityPercentage}%` }}
          ></div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={onBook} className="w-full">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
