import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trash2, 
  Leaf, 
  Cigarette, 
  Package, 
  Coffee,
  Utensils,
  ShoppingBag,
  Zap
} from 'lucide-react';

export interface WasteCategory {
  id: string;
  name: string;
  icon: any;
  creditValue: number;
  color: string;
  description: string;
  examples: string[];
}

export const wasteCategories: WasteCategory[] = [
  {
    id: 'plastic',
    name: 'Plastic Bottles & Containers',
    icon: Package,
    creditValue: 20,
    color: 'text-blue-600',
    description: 'Single-use plastic containers, bottles, and packaging',
    examples: ['Water bottles', 'Soda containers', 'Food packaging', 'Plastic bags']
  },
  {
    id: 'food',
    name: 'Food Waste',
    icon: Utensils,
    creditValue: 15,
    color: 'text-green-600',
    description: 'Leftover food, organic waste, and food containers',
    examples: ['Leftover meals', 'Fruit peels', 'Food containers', 'Coffee cups']
  },
  {
    id: 'cigarettes',
    name: 'Cigarette Butts',
    icon: Cigarette,
    creditValue: 10,
    color: 'text-orange-600',
    description: 'Cigarette butts and smoking-related litter',
    examples: ['Cigarette butts', 'Cigarette packs', 'Lighter waste', 'Smoking accessories']
  },
  {
    id: 'paper',
    name: 'Paper & Cardboard',
    icon: Coffee,
    creditValue: 12,
    color: 'text-yellow-600',
    description: 'Paper products, newspapers, and cardboard waste',
    examples: ['Newspapers', 'Magazines', 'Cardboard boxes', 'Paper bags']
  },
  {
    id: 'general',
    name: 'General Litter',
    icon: Trash2,
    creditValue: 8,
    color: 'text-gray-600',
    description: 'Mixed waste and unclassified litter',
    examples: ['Mixed waste', 'Small debris', 'Wrappers', 'Unknown items']
  },
  {
    id: 'hazardous',
    name: 'Hazardous Materials',
    icon: Zap,
    creditValue: 30,
    color: 'text-red-600',
    description: 'Potentially harmful waste requiring special handling',
    examples: ['Batteries', 'Electronics', 'Chemicals', 'Glass shards']
  }
];

interface WasteCategorySelectorProps {
  selectedCategory?: WasteCategory;
  onCategorySelect: (category: WasteCategory) => void;
}

export const WasteCategorySelector = ({ 
  selectedCategory, 
  onCategorySelect 
}: WasteCategorySelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Select Waste Category</h3>
      <p className="text-sm text-muted-foreground">
        Choose the category that best describes the waste you're reporting
      </p>
      
      <div className="grid gap-3">
        {wasteCategories.map((category) => (
          <Card
            key={category.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-card ${
              selectedCategory?.id === category.id 
                ? 'ring-2 ring-nature-green bg-nature-light' 
                : 'hover:bg-muted/50'
            }`}
            onClick={() => onCategorySelect(category)}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <category.icon className={`w-5 h-5 ${category.color}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold">{category.name}</h4>
                  <Badge variant="outline" className="bg-warning-amber/10 text-warning-amber">
                    {category.creditValue} credits
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {category.examples.slice(0, 3).map((example) => (
                    <Badge key={example} variant="outline" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                  {category.examples.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{category.examples.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};