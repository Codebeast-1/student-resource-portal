
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface RequestDetailsProps {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  time: string;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  facultyRecommendation?: boolean;
  isAdmin: boolean;
  onStatusChange?: (id: string, status: 'approved' | 'rejected', comment: string) => void;
}

const RequestDetails: React.FC<RequestDetailsProps> = ({
  id,
  title,
  description,
  venue,
  date,
  time,
  requestedBy,
  status,
  facultyRecommendation = false,
  isAdmin,
  onStatusChange,
}) => {
  const [comment, setComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = (newStatus: 'approved' | 'rejected') => {
    if (onStatusChange) {
      onStatusChange(id, newStatus, comment);
      toast.success(`Request ${newStatus === 'approved' ? 'approved' : 'rejected'}`);
    }
  };

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'in-review': 'bg-blue-100 text-blue-800',
  };

  return (
    <Card className="mb-4 border-l-4 border-l-brand-500 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">
              {venue} • {date} • {time}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className={statusColors[status]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            {facultyRecommendation && (
              <Badge className="bg-purple-100 text-purple-800">
                Faculty Recommended
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground">Requested By:</div>
            <div className="font-medium">{requestedBy}</div>
          </div>
          
          {isExpanded && (
            <div>
              <div className="text-sm text-muted-foreground">Description:</div>
              <div className="text-sm">{description}</div>
            </div>
          )}
          
          {!isExpanded && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsExpanded(true)}
              className="text-muted-foreground"
            >
              Show more details
            </Button>
          )}
          
          {isAdmin && status === 'pending' && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Add Comment:</div>
              <Textarea 
                placeholder="Enter your comments or feedback" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          )}
        </div>
      </CardContent>
      
      {isAdmin && status === 'pending' && (
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => handleStatusChange('rejected')}>
            Reject
          </Button>
          <Button onClick={() => handleStatusChange('approved')}>
            Approve
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RequestDetails;
