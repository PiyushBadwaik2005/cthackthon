import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Award, Clock, CheckCircle } from 'lucide-react';

interface WasteSubmission {
  id: string;
  image: string;
  location: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  credits: number;
}

interface WasteSubmissionCardProps {
  submission: WasteSubmission;
}

export const WasteSubmissionCard = ({ submission }: WasteSubmissionCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success-emerald/10 text-success-emerald border-success-emerald';
      case 'rejected':
        return 'bg-destructive/10 text-destructive border-destructive';
      default:
        return 'bg-warning-amber/10 text-warning-amber border-warning-amber';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-3 h-3 mr-1" />;
      case 'rejected':
        return <Clock className="w-3 h-3 mr-1" />;
      default:
        return <Clock className="w-3 h-3 mr-1" />;
    }
  };

  return (
    <Card className="p-4 hover:shadow-card transition-all duration-300">
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={submission.image} 
            alt="Waste report" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{submission.location}</h3>
            <Badge variant="outline" className={getStatusColor(submission.status)}>
              {getStatusIcon(submission.status)}
              {submission.status}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {submission.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{submission.date}</span>
            </div>
            {submission.credits > 0 && (
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3 text-warning-amber" />
                <span className="text-warning-amber font-medium">
                  {submission.credits} Credits
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};