import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  Award,
  Calendar,
  Target,
  Leaf
} from 'lucide-react';

// Mock analytics data
const mockData = {
  totalReports: 1247,
  approvedReports: 1089,
  totalCredits: 15420,
  activeUsers: 342,
  weeklyGrowth: 23,
  topLocations: [
    { name: 'Central Park', reports: 124, credits: 1860 },
    { name: 'Brooklyn Bridge', reports: 89, credits: 1245 },
    { name: 'Times Square', reports: 76, credits: 1140 },
    { name: 'Battery Park', reports: 65, credits: 975 },
  ],
  wasteCategories: [
    { type: 'Plastic Bottles', count: 456, percentage: 37, color: 'bg-blue-500' },
    { type: 'Food Waste', count: 287, percentage: 23, color: 'bg-green-500' },
    { type: 'Cigarettes', count: 234, percentage: 19, color: 'bg-orange-500' },
    { type: 'Paper/Cardboard', count: 145, percentage: 12, color: 'bg-yellow-500' },
    { type: 'Other', count: 108, percentage: 9, color: 'bg-gray-500' },
  ],
  monthlyTrends: [
    { month: 'Jan', reports: 89, credits: 1230 },
    { month: 'Feb', reports: 124, credits: 1680 },
    { month: 'Mar', reports: 156, credits: 2100 },
    { month: 'Apr', reports: 187, credits: 2490 },
    { month: 'May', reports: 203, credits: 2710 },
    { month: 'Jun', reports: 234, credits: 3120 },
  ]
};

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track waste management progress and environmental impact across the community
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{mockData.totalReports.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-nature-light rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-nature-green" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-success-emerald mr-1" />
              <span className="text-success-emerald">+{mockData.weeklyGrowth}%</span>
              <span className="text-muted-foreground ml-1">this week</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved Reports</p>
                <p className="text-2xl font-bold">{mockData.approvedReports.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-success-emerald/20 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-success-emerald" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="bg-success-emerald/10 text-success-emerald">
                {Math.round((mockData.approvedReports / mockData.totalReports) * 100)}% approval rate
              </Badge>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Carbon Credits</p>
                <p className="text-2xl font-bold">{mockData.totalCredits.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-warning-amber/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-warning-amber" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Environmental impact offset
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{mockData.activeUsers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-sky-blue/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-sky-blue" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Community members
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Locations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-nature-green" />
              Top Reporting Locations
            </h3>
            <div className="space-y-4">
              {mockData.topLocations.map((location, index) => (
                <div key={location.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-nature-light rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{location.name}</p>
                      <p className="text-sm text-muted-foreground">{location.reports} reports</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-warning-amber/10 text-warning-amber">
                    {location.credits} credits
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Waste Categories */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-nature-green" />
              Waste Categories
            </h3>
            <div className="space-y-3">
              {mockData.wasteCategories.map((category) => (
                <div key={category.type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.type}</span>
                    <span className="text-sm text-muted-foreground">{category.count} reports</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-nature-green" />
            Monthly Trends
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {mockData.monthlyTrends.map((month, index) => (
              <div key={month.month} className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-sm font-medium text-muted-foreground mb-2">{month.month}</div>
                <div className="text-xl font-bold">{month.reports}</div>
                <div className="text-xs text-muted-foreground">reports</div>
                <div className="mt-2 text-sm text-warning-amber font-medium">{month.credits} credits</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Integration Notice */}
        <Card className="mt-8 p-6 bg-nature-light">
          <h3 className="font-semibold mb-2">Real-time Analytics Available</h3>
          <p className="text-muted-foreground">
            Connect to Supabase to enable real-time analytics tracking, custom date ranges, 
            and detailed reporting insights based on your actual user data.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;