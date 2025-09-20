import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BarChart3, 
  Trophy, 
  User, 
  Settings, 
  HelpCircle,
  Leaf
} from 'lucide-react';

interface NavigationProps {
  onRoleSelect?: (role: 'user' | 'worker') => void;
}

export const Navigation = ({ onRoleSelect }: NavigationProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  return (
    <nav className="bg-card border-b shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-nature rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            Clean Earth
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className={`gap-2 ${isActive(item.path) ? 'bg-nature-green hover:bg-nature-green/90' : ''}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Role Selection Buttons */}
          {onRoleSelect && (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => onRoleSelect('user')}
                className="bg-gradient-nature hover:opacity-90"
                size="sm"
              >
                Report Waste
              </Button>
              <Button
                onClick={() => onRoleSelect('worker')}
                className="bg-gradient-earth hover:opacity-90"
                size="sm"
              >
                Worker Panel
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                className={`gap-2 whitespace-nowrap ${isActive(item.path) ? 'bg-nature-green hover:bg-nature-green/90' : ''}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};