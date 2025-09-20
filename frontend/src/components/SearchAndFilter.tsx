import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar as CalendarIcon,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { format } from 'date-fns';

export interface FilterOptions {
  searchQuery: string;
  location: string;
  status: string;
  category: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
  sortBy: string;
}

interface SearchAndFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  showAdvanced?: boolean;
}

export const SearchAndFilter = ({ 
  filters, 
  onFiltersChange, 
  showAdvanced = false 
}: SearchAndFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchQuery: '',
      location: '',
      status: '',
      category: '',
      dateRange: {},
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value && (typeof value === 'string' ? value !== '' : Object.keys(value).length > 0)
  ) && filters.searchQuery !== '' || filters.location !== '' || filters.status !== '' || filters.category !== '';

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search reports by location, description..."
            className="pl-10"
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? 'bg-muted' : ''}
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters.location && (
            <Badge variant="outline" className="gap-1">
              <MapPin className="w-3 h-3" />
              {filters.location}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => updateFilter('location', '')} 
              />
            </Badge>
          )}
          
          {filters.status && (
            <Badge variant="outline" className="gap-1">
              Status: {filters.status}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => updateFilter('status', '')} 
              />
            </Badge>
          )}
          
          {filters.category && (
            <Badge variant="outline" className="gap-1">
              Category: {filters.category}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => updateFilter('category', '')} 
              />
            </Badge>
          )}
          
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Advanced Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
          {/* Location */}
          <div>
            <label className="text-sm font-medium mb-2 block">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Enter location"
                className="pl-10"
                value={filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                <SelectItem value="plastic">Plastic</SelectItem>
                <SelectItem value="food">Food Waste</SelectItem>
                <SelectItem value="cigarettes">Cigarettes</SelectItem>
                <SelectItem value="paper">Paper</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="hazardous">Hazardous</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="credits">Most Credits</SelectItem>
                <SelectItem value="location">Location A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range (Advanced only) */}
          {showAdvanced && (
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateRange.from ? format(filters.dateRange.from, 'MMM dd') : 'From date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange.from}
                      onSelect={(date) => updateFilter('dateRange', { ...filters.dateRange, from: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateRange.to ? format(filters.dateRange.to, 'MMM dd') : 'To date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange.to}
                      onSelect={(date) => updateFilter('dateRange', { ...filters.dateRange, to: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};