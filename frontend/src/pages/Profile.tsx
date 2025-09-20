import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Settings, 
  Award, 
  Camera,
  MapPin,
  Calendar,
  Trophy,
  Target,
  TrendingUp,
  Edit2,
  Save,
  X
} from 'lucide-react';

// Mock user profile data
const mockProfile = {
  id: '1',
  name: 'EcoWarrior Sarah',
  email: 'sarah.eco@example.com',
  avatar: '/placeholder.svg',
  bio: 'Passionate about making our city cleaner and greener. Every small action counts! 🌱',
  location: 'New York City, NY',
  joinDate: '2023-08-15',
  level: 'Platinum',
  rank: 1,
  stats: {
    totalReports: 156,
    approvedReports: 145,
    totalCredits: 2340,
    currentStreak: 28,
    longestStreak: 45,
    favoriteLocation: 'Central Park'
  },
  achievements: [
    { name: 'First Report', icon: '⭐', unlockedDate: '2023-08-15' },
    { name: 'Weekly Hero', icon: '🏆', unlockedDate: '2023-09-02' },
    { name: 'City Champion', icon: '👑', unlockedDate: '2023-10-15' },
    { name: 'Monthly Master', icon: '🥇', unlockedDate: '2023-11-01' },
    { name: 'Weekend Warrior', icon: '⚔️', unlockedDate: '2023-09-30' },
    { name: 'Consistent Reporter', icon: '📈', unlockedDate: '2023-09-22' },
  ],
  recentActivity: [
    { date: '2024-01-15', action: 'Reported waste at Central Park', credits: 20 },
    { date: '2024-01-14', action: 'Approved cleanup at Times Square', credits: 15 },
    { date: '2024-01-13', action: 'Reported cigarette butts near subway', credits: 10 },
    { date: '2024-01-12', action: 'Completed weekly challenge', credits: 50 },
  ]
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: mockProfile.name,
    bio: mockProfile.bio,
    location: mockProfile.location,
  });

  const handleSave = () => {
    // Here you would update the profile via Supabase
    console.log('Saving profile:', editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({
      name: mockProfile.name,
      bio: mockProfile.bio,
      location: mockProfile.location,
    });
    setIsEditing(false);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Platinum': return 'bg-gradient-to-r from-slate-400 to-slate-600 text-white';
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'Silver': return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      default: return 'bg-gradient-to-r from-green-400 to-green-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24">
                    <img src={mockProfile.avatar} alt={mockProfile.name} className="w-full h-full object-cover" />
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-nature-green hover:bg-nature-green/90"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                {!isEditing ? (
                  <>
                    <h1 className="text-2xl font-bold mb-2">{mockProfile.name}</h1>
                    <p className="text-muted-foreground mb-4">{mockProfile.bio}</p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{mockProfile.location}</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4 text-left">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Badge className={getLevelColor(mockProfile.level)}>
                    {mockProfile.level} Level
                  </Badge>
                  <Badge variant="outline" className="bg-warning-amber/10 text-warning-amber">
                    Rank #{mockProfile.rank}
                  </Badge>
                </div>
                
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm" className="bg-nature-green hover:bg-nature-green/90">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Member since {new Date(mockProfile.joinDate).toLocaleDateString()}</span>
              </div>
            </Card>
          </div>

          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="w-10 h-10 bg-nature-light rounded-full flex items-center justify-center mx-auto mb-2">
                  <Camera className="w-5 h-5 text-nature-green" />
                </div>
                <div className="text-2xl font-bold">{mockProfile.stats.totalReports}</div>
                <div className="text-sm text-muted-foreground">Total Reports</div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="w-10 h-10 bg-success-emerald/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-5 h-5 text-success-emerald" />
                </div>
                <div className="text-2xl font-bold">{mockProfile.stats.approvedReports}</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="w-10 h-10 bg-warning-amber/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-5 h-5 text-warning-amber" />
                </div>
                <div className="text-2xl font-bold">{mockProfile.stats.totalCredits}</div>
                <div className="text-sm text-muted-foreground">Credits</div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="w-10 h-10 bg-sky-blue/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-5 h-5 text-sky-blue" />
                </div>
                <div className="text-2xl font-bold">{mockProfile.stats.currentStreak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </Card>
            </div>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning-amber" />
                Achievements ({mockProfile.achievements.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mockProfile.achievements.map((achievement) => (
                  <div
                    key={achievement.name}
                    className="bg-muted/50 rounded-lg p-4 text-center hover:bg-muted transition-colors"
                  >
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <div className="font-semibold text-sm mb-1">{achievement.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Unlocked: {new Date(achievement.unlockedDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-nature-green" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {mockProfile.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">{activity.date}</div>
                    </div>
                    <Badge variant="outline" className="bg-warning-amber/10 text-warning-amber">
                      +{activity.credits} credits
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Integration Notice */}
            <Card className="p-6 bg-nature-light">
              <h3 className="font-semibold mb-2">Personalized Profiles</h3>
              <p className="text-muted-foreground">
                Connect to Supabase to enable personalized user profiles, real achievement tracking, 
                custom avatars, and detailed activity history.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;