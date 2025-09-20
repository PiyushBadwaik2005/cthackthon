import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserDashboard } from '@/components/UserDashboard';
import { WorkerDashboard } from '@/components/WorkerDashboard';
import { Navigation } from '@/components/Navigation';
import { Users, HardHat, Leaf, Award, MapPin, Camera, BarChart3, Trophy } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

type UserRole = 'user' | 'worker' | null;

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  if (userRole === 'user') {
    return <UserDashboard onBack={() => setUserRole(null)} />;
  }

  if (userRole === 'worker') {
    return <WorkerDashboard onBack={() => setUserRole(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onRoleSelect={setUserRole} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Clean environment hero" 
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="mb-6 text-5xl font-bold">
            Clean Earth Initiative
          </h1>
          <p className="mb-8 text-xl opacity-90 max-w-2xl mx-auto">
            Join our community-driven waste management system. Report waste, earn carbon credits, and help build a cleaner world together.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin className="w-4 h-4" />
              <span>Location-based</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Award className="w-4 h-4" />
              <span>Carbon Credits</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Camera className="w-4 h-4" />
              <span>Photo Reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Role</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Whether you're reporting waste or managing cleanup efforts, we have the right tools for you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* User Card */}
            <Card className="p-8 text-center hover:shadow-elevated transition-all duration-300 border-2 hover:border-nature-green">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-nature rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Community Reporter</h3>
                <p className="text-muted-foreground mb-6">
                  Report waste locations with photos and earn carbon credits for verified submissions.
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Camera className="w-4 h-4 text-nature-green" />
                  <span>Upload waste photos</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-nature-green" />
                  <span>Share location data</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-nature-green" />
                  <span>Earn carbon credits</span>
                </div>
              </div>
              
              <Button 
                onClick={() => setUserRole('user')} 
                className="w-full bg-gradient-nature hover:opacity-90 text-white shadow-nature"
                size="lg"
              >
                Start Reporting
              </Button>
            </Card>

            {/* Worker Card */}
            <Card className="p-8 text-center hover:shadow-elevated transition-all duration-300 border-2 hover:border-earth-brown">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mx-auto mb-4">
                  <HardHat className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Cleanup Worker</h3>
                <p className="text-muted-foreground mb-6">
                  Review and approve waste reports, coordinate cleanup efforts in your area.
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Leaf className="w-4 h-4 text-earth-brown" />
                  <span>Review submissions</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-earth-brown" />
                  <span>Manage cleanup areas</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-earth-brown" />
                  <span>Award credits</span>
                </div>
              </div>
              
              <Button 
                onClick={() => setUserRole('worker')} 
                className="w-full bg-gradient-earth hover:opacity-90 text-white shadow-elevated"
                size="lg"
              >
                Start Managing
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-nature-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our simple three-step process makes waste reporting and cleanup coordination effortless and rewarding.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-nature-green rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
              <h3 className="font-semibold mb-2">Report Waste</h3>
              <p className="text-sm text-muted-foreground">Take a photo of waste and share the location</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-earth-brown rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
              <h3 className="font-semibold mb-2">Worker Reviews</h3>
              <p className="text-sm text-muted-foreground">Local workers verify and approve your submission</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-success-emerald rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
              <h3 className="font-semibold mb-2">Earn Credits</h3>
              <p className="text-sm text-muted-foreground">Get carbon credits for verified contributions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;