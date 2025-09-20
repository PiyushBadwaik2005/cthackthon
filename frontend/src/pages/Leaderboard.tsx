import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  TrendingUp,
  Calendar,
  Filter,
  Star
} from 'lucide-react';

// Mock leaderboard data
const mockUsers = [
  {
    id: '1',
    name: 'EcoWarrior Sarah',
    avatar: '/placeholder.svg',
    reports: 156,
    credits: 2340,
    streak: 28,
    level: 'Platinum',
    achievements: ['First Report', 'Weekly Hero', 'City Champion'],
    joinDate: '2023-08-15'
  },
  {
    id: '2',
    name: 'GreenHero Mike',
    avatar: '/placeholder.svg',
    reports: 142,
    credits: 2130,
    streak: 15,
    level: 'Gold',
    achievements: ['First Report', 'Monthly Master'],
    joinDate: '2023-09-02'
  },
  {
    id: '3',
    name: 'CleanCity Alex',
    avatar: '/placeholder.svg',
    reports: 128,
    credits: 1920,
    streak: 22,
    level: 'Gold',
    achievements: ['First Report', 'Weekend Warrior'],
    joinDate: '2023-07-20'
  },
  {
    id: '4',
    name: 'EcoFriend Lisa',
    avatar: '/placeholder.svg',
    reports: 98,
    credits: 1470,
    streak: 8,
    level: 'Silver',
    achievements: ['First Report'],
    joinDate: '2023-10-12'
  },
  {
    id: '5',
    name: 'GreenThumb Tom',
    avatar: '/placeholder.svg',
    reports: 87,
    credits: 1305,
    streak: 12,
    level: 'Silver',
    achievements: ['First Report', 'Consistent Reporter'],
    joinDate: '2023-11-01'
  },
];

const mockWorkers = [
  {
    id: '1',
    name: 'Captain Clean',
    avatar: '/placeholder.svg',
    approved: 324,
    creditsAwarded: 4860,
    responseTime: '2.3 hrs',
    level: 'Supervisor',
    efficiency: 97
  },
  {
    id: '2',
    name: 'Waste Master Pro',
    avatar: '/placeholder.svg',
    approved: 287,
    creditsAwarded: 4305,
    responseTime: '3.1 hrs',
    level: 'Expert',
    efficiency: 94
  },
  {
    id: '3',
    name: 'CleanUp Chief',
    avatar: '/placeholder.svg',
    approved: 245,
    creditsAwarded: 3675,
    responseTime: '2.8 hrs',
    level: 'Expert',
    efficiency: 91
  }
];

const achievements = [
  { name: 'First Report', icon: Star, description: 'Submit your first waste report', color: 'text-yellow-500' },
  { name: 'Weekly Hero', icon: Trophy, description: 'Top reporter of the week', color: 'text-amber-500' },
  { name: 'City Champion', icon: Crown, description: 'Top reporter in your city', color: 'text-purple-500' },
  { name: 'Monthly Master', icon: Medal, description: 'Top reporter of the month', color: 'text-blue-500' },
  { name: 'Weekend Warrior', icon: Award, description: 'Most weekend reports', color: 'text-green-500' },
  { name: 'Consistent Reporter', icon: TrendingUp, description: '7-day reporting streak', color: 'text-emerald-500' },
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'workers'>('users');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year' | 'all'>('month');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Platinum': return 'bg-gradient-to-r from-slate-400 to-slate-600 text-white';
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'Silver': return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 'Supervisor': return 'bg-gradient-to-r from-purple-400 to-purple-600 text-white';
      case 'Expert': return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
      default: return 'bg-gradient-to-r from-green-400 to-green-600 text-white';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-amber-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Leaderboard</h1>
          <p className="text-muted-foreground">
            Celebrate our top contributors making the world cleaner, one report at a time
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Tab Selection */}
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={activeTab === 'users' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('users')}
              className={activeTab === 'users' ? 'bg-nature-green hover:bg-nature-green/90' : ''}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Reporters
            </Button>
            <Button
              variant={activeTab === 'workers' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('workers')}
              className={activeTab === 'workers' ? 'bg-earth-brown hover:bg-earth-brown/90' : ''}
            >
              <Medal className="w-4 h-4 mr-2" />
              Workers
            </Button>
          </div>

          {/* Time Range Filter */}
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            {(['week', 'month', 'year', 'all'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? 'bg-white shadow-sm' : ''}
              >
                {range === 'all' ? 'All Time' : range.charAt(0).toUpperCase() + range.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {activeTab === 'users' ? (
          <>
            {/* Top 3 Podium */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {mockUsers.slice(0, 3).map((user, index) => (
                <Card key={user.id} className={`p-6 text-center ${index === 0 ? 'ring-2 ring-amber-400 shadow-elevated' : ''}`}>
                  <div className="relative mb-4">
                    <Avatar className="w-20 h-20 mx-auto">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </Avatar>
                    <div className="absolute -top-2 -right-2">
                      {getRankIcon(index + 1)}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{user.name}</h3>
                  <Badge className={`mb-3 ${getLevelColor(user.level)}`}>
                    {user.level}
                  </Badge>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reports:</span>
                      <span className="font-semibold">{user.reports}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Credits:</span>
                      <span className="font-semibold text-warning-amber">{user.credits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Streak:</span>
                      <span className="font-semibold">{user.streak} days</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Full Leaderboard */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Full Rankings</h3>
              <div className="space-y-4">
                {mockUsers.map((user, index) => (
                  <div key={user.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getRankIcon(index + 1)}
                      </div>
                      <Avatar className="w-10 h-10">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Member since {new Date(user.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-semibold">{user.reports}</div>
                        <div className="text-muted-foreground">Reports</div>
                      </div>
                      <div>
                        <div className="font-semibold text-warning-amber">{user.credits}</div>
                        <div className="text-muted-foreground">Credits</div>
                      </div>
                      <div>
                        <div className="font-semibold">{user.streak}</div>
                        <div className="text-muted-foreground">Streak</div>
                      </div>
                    </div>
                    
                    <Badge className={getLevelColor(user.level)}>
                      {user.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </>
        ) : (
          /* Workers Leaderboard */
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Workers</h3>
            <div className="space-y-4">
              {mockWorkers.map((worker, index) => (
                <div key={worker.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {getRankIcon(index + 1)}
                    </div>
                    <Avatar className="w-10 h-10">
                      <img src={worker.avatar} alt={worker.name} className="w-full h-full object-cover" />
                    </Avatar>
                    <div>
                      <div className="font-semibold">{worker.name}</div>
                      <Badge className={getLevelColor(worker.level)}>
                        {worker.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-center text-sm">
                    <div>
                      <div className="font-semibold">{worker.approved}</div>
                      <div className="text-muted-foreground">Approved</div>
                    </div>
                    <div>
                      <div className="font-semibold text-warning-amber">{worker.creditsAwarded}</div>
                      <div className="text-muted-foreground">Credits Awarded</div>
                    </div>
                    <div>
                      <div className="font-semibold">{worker.responseTime}</div>
                      <div className="text-muted-foreground">Avg Response</div>
                    </div>
                    <div>
                      <div className="font-semibold text-success-emerald">{worker.efficiency}%</div>
                      <div className="text-muted-foreground">Efficiency</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Achievements */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold mb-4">Available Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.name} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                <div>
                  <div className="font-semibold">{achievement.name}</div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;