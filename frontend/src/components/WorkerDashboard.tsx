import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, Clock, MapPin, Award } from 'lucide-react';

interface WorkerDashboardProps {
  onBack: () => void;
}

// Mock data for pending submissions
const mockPendingSubmissions = [
  {
    id: '1',
    image: '/placeholder.svg',
    location: 'Central Park, NYC',
    description: 'Plastic bottles scattered near playground',
    submittedBy: 'EcoUser123',
    date: '2024-01-15',
    estimatedCredits: 20,
  },
  {
    id: '2',
    image: '/placeholder.svg',
    location: 'Broadway Street',
    description: 'Cigarette butts and food wrappers around bus stop',
    submittedBy: 'GreenHero45',
    date: '2024-01-15',
    estimatedCredits: 15,
  },
  {
    id: '3',
    image: '/placeholder.svg',
    location: 'Riverside Park',
    description: 'Food containers left after picnic',
    submittedBy: 'CityKeeper',
    date: '2024-01-14',
    estimatedCredits: 25,
  },
];

export const WorkerDashboard = ({ onBack }: WorkerDashboardProps) => {
  const [submissions, setSubmissions] = useState(mockPendingSubmissions);

  const handleApprove = (id: string) => {
    setSubmissions(prev => prev.filter(sub => sub.id !== id));
    // Here you would update Supabase and award carbon credits
    console.log('Approved submission:', id);
  };

  const handleReject = (id: string) => {
    setSubmissions(prev => prev.filter(sub => sub.id !== id));
    console.log('Rejected submission:', id);
  };

  const totalPending = submissions.length;
  const todaysPending = submissions.filter(sub => sub.date === '2024-01-15').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Worker Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-warning-amber/10 text-warning-amber border-warning-amber">
              <Clock className="w-3 h-3 mr-1" />
              {totalPending} Pending
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-warning-amber/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-warning-amber" />
            </div>
            <h3 className="text-2xl font-bold">{totalPending}</h3>
            <p className="text-muted-foreground">Pending Reviews</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-success-emerald/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-success-emerald" />
            </div>
            <h3 className="text-2xl font-bold">{todaysPending}</h3>
            <p className="text-muted-foreground">Today's Reports</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-earth-brown/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-earth-brown" />
            </div>
            <h3 className="text-2xl font-bold">
              {submissions.reduce((sum, sub) => sum + sub.estimatedCredits, 0)}
            </h3>
            <p className="text-muted-foreground">Credits to Award</p>
          </Card>
        </div>

        {/* Pending Submissions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Waste Reports</h2>
          {submissions.length === 0 ? (
            <Card className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-success-emerald mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
              <p className="text-muted-foreground">No pending submissions to review.</p>
            </Card>
          ) : (
            <div className="grid gap-6">
              {submissions.map((submission) => (
                <Card key={submission.id} className="p-6">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      <img 
                        src={submission.image} 
                        alt="Waste report" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{submission.location}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span>Reported by: {submission.submittedBy}</span>
                            <span>Date: {submission.date}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-warning-amber/10 text-warning-amber">
                          <Award className="w-3 h-3 mr-1" />
                          {submission.estimatedCredits} Credits
                        </Badge>
                      </div>
                      
                      <p className="text-foreground mb-4">{submission.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>View on map for cleanup coordination</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleApprove(submission.id)}
                          className="bg-success-emerald hover:bg-success-emerald/90 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve & Award Credits
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleReject(submission.id)}
                          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Integration Notice */}
        <Card className="mt-8 p-6 bg-nature-light">
          <h3 className="font-semibold mb-2">Ready for Backend Integration</h3>
          <p className="text-muted-foreground mb-4">
            Connect your project to Supabase to enable real user authentication, image storage, 
            carbon credit tracking, and worker approval workflows.
          </p>
        </Card>
      </div>
    </div>
  );
};