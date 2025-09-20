import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  Bell, 
  MapPin, 
  Shield, 
  Smartphone,
  Globe,
  Download,
  Trash2,
  AlertTriangle
} from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    reportApproved: true,
    newReportsNearby: true,
    weeklyDigest: true,
    achievements: true,
    leaderboardUpdates: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showLocation: true,
    shareStats: true,
    allowMessages: true,
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    units: 'metric',
    theme: 'system',
    defaultLocation: '',
    reportRadius: '5',
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    if (typeof privacy[key] === 'boolean') {
      setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Customize your Clean Earth experience and manage your preferences
          </p>
        </div>

        <div className="space-y-8">
          {/* Notifications */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-nature-green" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Report Approved</Label>
                  <p className="text-sm text-muted-foreground">Get notified when your waste reports are approved</p>
                </div>
                <Switch 
                  checked={notifications.reportApproved}
                  onCheckedChange={() => handleNotificationChange('reportApproved')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">New Reports Nearby</Label>
                  <p className="text-sm text-muted-foreground">Alerts for new waste reports in your area</p>
                </div>
                <Switch 
                  checked={notifications.newReportsNearby}
                  onCheckedChange={() => handleNotificationChange('newReportsNearby')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">Weekly summary of your contributions</p>
                </div>
                <Switch 
                  checked={notifications.weeklyDigest}
                  onCheckedChange={() => handleNotificationChange('weeklyDigest')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Achievements</Label>
                  <p className="text-sm text-muted-foreground">Notifications for unlocked achievements</p>
                </div>
                <Switch 
                  checked={notifications.achievements}
                  onCheckedChange={() => handleNotificationChange('achievements')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Leaderboard Updates</Label>
                  <p className="text-sm text-muted-foreground">Changes in your leaderboard position</p>
                </div>
                <Switch 
                  checked={notifications.leaderboardUpdates}
                  onCheckedChange={() => handleNotificationChange('leaderboardUpdates')}
                />
              </div>
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-nature-green" />
              <h2 className="text-xl font-semibold">Privacy & Security</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">Who can see your profile information</p>
                </div>
                <Select value={privacy.profileVisibility} onValueChange={(value) => setPrivacy(prev => ({ ...prev, profileVisibility: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="friends">Friends</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Show Location</Label>
                  <p className="text-sm text-muted-foreground">Display your general location on profile</p>
                </div>
                <Switch 
                  checked={privacy.showLocation}
                  onCheckedChange={() => handlePrivacyChange('showLocation')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Share Statistics</Label>
                  <p className="text-sm text-muted-foreground">Include your stats in community analytics</p>
                </div>
                <Switch 
                  checked={privacy.shareStats}
                  onCheckedChange={() => handlePrivacyChange('shareStats')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Allow Messages</Label>
                  <p className="text-sm text-muted-foreground">Let other users send you messages</p>
                </div>
                <Switch 
                  checked={privacy.allowMessages}
                  onCheckedChange={() => handlePrivacyChange('allowMessages')}
                />
              </div>
            </div>
          </Card>

          {/* App Preferences */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <SettingsIcon className="w-5 h-5 text-nature-green" />
              <h2 className="text-xl font-semibold">App Preferences</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="language" className="text-base font-medium">Language</Label>
                  <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="theme" className="text-base font-medium">Theme</Label>
                  <Select value={preferences.theme} onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="units" className="text-base font-medium">Units</Label>
                  <Select value={preferences.units} onValueChange={(value) => setPreferences(prev => ({ ...prev, units: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (km, kg)</SelectItem>
                      <SelectItem value="imperial">Imperial (mi, lb)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="defaultLocation" className="text-base font-medium">Default Location</Label>
                  <Input
                    id="defaultLocation"
                    placeholder="Enter your city or area"
                    value={preferences.defaultLocation}
                    onChange={(e) => setPreferences(prev => ({ ...prev, defaultLocation: e.target.value }))}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Used for nearby reports and suggestions</p>
                </div>

                <div>
                  <Label htmlFor="reportRadius" className="text-base font-medium">Report Radius (km)</Label>
                  <Select value={preferences.reportRadius} onValueChange={(value) => setPreferences(prev => ({ ...prev, reportRadius: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 km</SelectItem>
                      <SelectItem value="5">5 km</SelectItem>
                      <SelectItem value="10">10 km</SelectItem>
                      <SelectItem value="25">25 km</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">Range for nearby report notifications</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Data Management */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Download className="w-5 h-5 text-nature-green" />
              <h2 className="text-xl font-semibold">Data Management</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Export Data</Label>
                  <p className="text-sm text-muted-foreground">Download your reports, achievements, and statistics</p>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium text-destructive">Delete Account</Label>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
                </div>
                <Button variant="destructive" className="bg-destructive hover:bg-destructive/90">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>

          {/* Save Settings */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">Reset to Defaults</Button>
            <Button className="bg-nature-green hover:bg-nature-green/90">
              Save Changes
            </Button>
          </div>

          {/* Integration Notice */}
          <Card className="p-6 bg-nature-light">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning-amber mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">Settings Persistence</h3>
                <p className="text-muted-foreground">
                  Connect to Supabase to save your settings permanently across devices and sessions. 
                  Currently, settings are stored locally and may be lost when clearing browser data.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;