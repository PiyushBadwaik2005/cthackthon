import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Search, 
  MessageSquare, 
  FileText, 
  Video,
  Phone,
  Mail,
  MapPin,
  Camera,
  Award,
  Users,
  Shield,
  Zap
} from 'lucide-react';

const faqData = [
  {
    category: 'Getting Started',
    icon: Zap,
    questions: [
      {
        q: 'How do I report a waste location?',
        a: 'Simply select "Community Reporter" from the home page, click "Report New Waste Location", take a photo, add the location and description, then submit. A worker will review and approve your report to award carbon credits.'
      },
      {
        q: 'What types of waste can I report?',
        a: 'You can report all types of waste including plastic bottles, food waste, cigarette butts, paper/cardboard, and general litter. Different waste types may have different carbon credit values.'
      },
      {
        q: 'Do I need to create an account?',
        a: 'Currently, the app works without registration. However, to save your progress and earn carbon credits permanently, you\'ll need to connect the app to Supabase for user authentication.'
      }
    ]
  },
  {
    category: 'Carbon Credits',
    icon: Award,
    questions: [
      {
        q: 'How are carbon credits calculated?',
        a: 'Carbon credits are awarded based on the type and severity of waste reported. Typical values: plastic bottles (15-20 credits), food waste (10-15 credits), cigarette butts (5-10 credits). Workers verify and approve the final credit amount.'
      },
      {
        q: 'What can I do with carbon credits?',
        a: 'Carbon credits show your environmental impact and help you climb the leaderboard. Future features will include redeeming credits for rewards, discounts, and environmental project donations.'
      },
      {
        q: 'How long does it take to receive credits?',
        a: 'Once a worker approves your report, credits are awarded immediately. Most reports are reviewed within 24-48 hours depending on worker availability in your area.'
      }
    ]
  },
  {
    category: 'Worker Features',
    icon: Users,
    questions: [
      {
        q: 'How do I become a worker?',
        a: 'Select "Cleanup Worker" from the home page to access the worker dashboard. In the full version with Supabase integration, workers would need verification and area assignment.'
      },
      {
        q: 'What are my responsibilities as a worker?',
        a: 'Workers review waste reports, verify their accuracy, approve or reject submissions, and coordinate cleanup efforts. You help maintain the quality and credibility of the reporting system.'
      },
      {
        q: 'How do I approve or reject reports?',
        a: 'In the worker dashboard, you\'ll see pending submissions with photos and descriptions. Click "Approve & Award Credits" for valid reports or "Reject Report" for invalid submissions.'
      }
    ]
  },
  {
    category: 'Privacy & Security',
    icon: Shield,
    questions: [
      {
        q: 'Is my location data safe?',
        a: 'We only collect location data for waste reports when you choose to share it. Your personal location is never tracked without your permission. All data is stored securely with encryption.'
      },
      {
        q: 'Can I delete my data?',
        a: 'Yes, you can export or delete all your data from the Settings page. This includes reports, credits, achievements, and profile information.'
      },
      {
        q: 'Who can see my reports?',
        a: 'Reports are visible to workers for verification and appear anonymously in community statistics. You can control your profile visibility in Settings.'
      }
    ]
  },
  {
    category: 'Technical Issues',
    icon: FileText,
    questions: [
      {
        q: 'The app won\'t load my camera',
        a: 'Make sure you\'ve granted camera permissions to your browser. Try refreshing the page or using a different browser. For mobile devices, ensure the camera app isn\'t being used by another application.'
      },
      {
        q: 'My reports aren\'t syncing',
        a: 'Check your internet connection. Reports are currently stored locally. For cloud syncing and backup, the app needs to be connected to Supabase for backend functionality.'
      },
      {
        q: 'I lost my progress/credits',
        a: 'Without Supabase integration, data is stored in your browser locally. Clearing browser data or switching devices will reset progress. Connect to Supabase to save progress permanently.'
      }
    ]
  }
];

const tutorials = [
  {
    title: 'How to Report Waste Effectively',
    description: 'Learn the best practices for taking photos and describing waste locations',
    duration: '3 min read',
    icon: Camera
  },
  {
    title: 'Understanding Carbon Credits',
    description: 'Discover how our credit system works and maximize your environmental impact',
    duration: '5 min read', 
    icon: Award
  },
  {
    title: 'Worker Guide: Reviewing Reports',
    description: 'Complete guide for workers on evaluating and approving waste submissions',
    duration: '7 min read',
    icon: Users
  },
  {
    title: 'Privacy Settings Explained',
    description: 'Control your data and privacy settings for a safer experience',
    duration: '4 min read',
    icon: Shield
  }
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Here you would send the form data to Supabase or email service
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-muted-foreground">
            Find answers to common questions and learn how to make the most of Clean Earth
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search */}
            <Card className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search help articles and FAQs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </Card>

            {/* FAQ */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-nature-green" />
                Frequently Asked Questions
              </h2>
              
              {filteredFAQ.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No results found for "{searchQuery}". Try different keywords or browse categories below.
                </p>
              ) : (
                <div className="space-y-6">
                  {filteredFAQ.map((category) => (
                    <div key={category.category}>
                      <div className="flex items-center gap-2 mb-4">
                        <category.icon className="w-5 h-5 text-nature-green" />
                        <h3 className="text-lg font-semibold">{category.category}</h3>
                        <Badge variant="outline">{category.questions.length}</Badge>
                      </div>
                      
                      <Accordion type="single" collapsible>
                        {category.questions.map((qa, index) => (
                          <AccordionItem key={index} value={`${category.category}-${index}`}>
                            <AccordionTrigger className="text-left">
                              {qa.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {qa.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Tutorials */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Video className="w-5 h-5 text-nature-green" />
                Tutorials & Guides
              </h2>
              
              <div className="grid gap-4">
                {tutorials.map((tutorial) => (
                  <div key={tutorial.title} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-nature-light rounded-full flex items-center justify-center">
                      <tutorial.icon className="w-5 h-5 text-nature-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{tutorial.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{tutorial.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {tutorial.duration}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/">
                    <Camera className="w-4 h-4 mr-2" />
                    Report Waste
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/leaderboard">
                    <Award className="w-4 h-4 mr-2" />
                    View Leaderboard
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/profile">
                    <Users className="w-4 h-4 mr-2" />
                    My Profile
                  </a>
                </Button>
              </div>
            </Card>

            {/* Contact Support */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-nature-green" />
                Contact Support
              </h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-nature-green hover:bg-nature-green/90">
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Other Ways to Reach Us</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>support@cleanearth.app</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>1-800-CLEAN-UP</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>24/7 Community Support</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;