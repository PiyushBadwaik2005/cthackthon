import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { WasteSubmissionCard } from '@/components/WasteSubmissionCard';
import { CarbonCreditCard } from '@/components/CarbonCreditCard';
import { WasteCategorySelector, WasteCategory, wasteCategories } from '@/components/WasteCategorySelector';
import { SearchAndFilter, FilterOptions } from '@/components/SearchAndFilter';
import { ArrowLeft, Camera, MapPin, Upload, Award, Filter, TrendingUp } from 'lucide-react';

interface UserDashboardProps {
  onBack: () => void;
}

// Mock data for demonstration with categories
const mockSubmissions = [
  {
    id: '1',
    image: '/placeholder.svg',
    location: 'Central Park, NYC',
    description: 'Plastic bottles scattered near playground',
    status: 'pending' as const,
    date: '2024-01-15',
    credits: 0,
    category: 'plastic',
  },
  {
    id: '2',
    image: '/placeholder.svg',
    location: 'Broadway Street',
    description: 'Cigarette butts and food wrappers',
    status: 'approved' as const,
    date: '2024-01-12',
    credits: 15,
    category: 'cigarettes',
  },
  {
    id: '3',
    image: '/placeholder.svg',
    location: 'Times Square',
    description: 'Food containers left after lunch',
    status: 'approved' as const,
    date: '2024-01-10',
    credits: 18,
    category: 'food',
  },
  {
    id: '4',
    image: '/placeholder.svg',
    location: 'Battery Park',
    description: 'Mixed litter and paper waste',
    status: 'rejected' as const,
    date: '2024-01-08',
    credits: 0,
    category: 'general',
  },
];

export const UserDashboard = ({ onBack }: UserDashboardProps) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<WasteCategory | undefined>();
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    location: '',
    status: '',
    category: '',
    dateRange: {},
    sortBy: 'newest'
  });
  const [formData, setFormData] = useState({
    image: null as File | null,
    location: '',
    description: '',
    category: undefined as WasteCategory | undefined,
  });

  const totalCredits = mockSubmissions.reduce((sum, sub) => sum + sub.credits, 0);
  const approvedCount = mockSubmissions.filter(sub => sub.status === 'approved').length;
  const pendingCount = mockSubmissions.filter(sub => sub.status === 'pending').length;

  // Filter submissions based on search criteria
  const filteredSubmissions = mockSubmissions.filter(submission => {
    if (filters.searchQuery && !submission.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) && 
        !submission.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    if (filters.location && !submission.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.status && submission.status !== filters.status) return false;
    if (filters.category && submission.category !== filters.category) return false;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      console.log('Please select a waste category');
      return;
    }
    // Here you would typically upload to Supabase
    console.log('Submitting:', { ...formData, category: formData.category });
    setShowForm(false);
    setFormData({ image: null, location: '', description: '', category: undefined });
    setSelectedCategory(undefined);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

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
            <h1 className="text-2xl font-bold">Community Reporter Dashboard</h1>
          </div>
          <CarbonCreditCard credits={totalCredits} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-nature-light rounded-full flex items-center justify-center mx-auto mb-3">
              <Camera className="w-6 h-6 text-nature-green" />
            </div>
            <h3 className="text-2xl font-bold">{mockSubmissions.length}</h3>
            <p className="text-muted-foreground">Total Reports</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-success-emerald/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-success-emerald" />
            </div>
            <h3 className="text-2xl font-bold">{approvedCount}</h3>
            <p className="text-muted-foreground">Approved Reports</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-warning-amber/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-warning-amber" />
            </div>
            <h3 className="text-2xl font-bold">{pendingCount}</h3>
            <p className="text-muted-foreground">Pending Review</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-warning-amber/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-warning-amber" />
            </div>
            <h3 className="text-2xl font-bold">{totalCredits}</h3>
            <p className="text-muted-foreground">Carbon Credits</p>
          </Card>
        </div>

        {/* New Report Button */}
        <div className="mb-8">
          {!showForm ? (
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-nature hover:opacity-90 text-white shadow-nature"
              size="lg"
            >
              <Camera className="w-5 h-5 mr-2" />
              Report New Waste Location
            </Button>
          ) : (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Submit New Waste Report</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <WasteCategorySelector
                  selectedCategory={formData.category}
                  onCategorySelect={(category) => {
                    setFormData({ ...formData, category });
                    setSelectedCategory(category);
                  }}
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Photo</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="max-w-xs mx-auto"
                    />
                    {formData.image && (
                      <p className="text-sm text-nature-green mt-2">
                        Selected: {formData.image.name}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter waste location (e.g., Central Park entrance)"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    placeholder="Describe the waste issue (type, amount, severity)"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    type="submit" 
                    className="bg-nature-green hover:bg-nature-green/90"
                    disabled={!formData.category}
                  >
                    Submit Report
                    {formData.category && (
                      <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded">
                        +{formData.category.creditValue} credits
                      </span>
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
              
              <div className="mt-4 p-3 bg-nature-light rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Tip:</strong>  Authentication, and carbon credit tracking.
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Recent Submissions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Waste Reports</h2>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
          
          <SearchAndFilter
            filters={filters}
            onFiltersChange={setFilters}
            showAdvanced={false}
          />
          
          <div className="grid gap-4 mt-6">
            {filteredSubmissions.length === 0 ? (
              <Card className="p-8 text-center">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reports found</h3>
                <p className="text-muted-foreground">
                  {filters.searchQuery || filters.location || filters.status || filters.category
                    ? 'Try adjusting your filters or search terms'
                    : 'Start making a difference by reporting your first waste location!'}
                </p>
              </Card>
            ) : (
              filteredSubmissions.map((submission) => (
                <WasteSubmissionCard key={submission.id} submission={submission} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};