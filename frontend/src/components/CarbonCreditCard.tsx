import { Card } from '@/components/ui/card';
import { Award, TrendingUp } from 'lucide-react';

interface CarbonCreditCardProps {
  credits: number;
}

export const CarbonCreditCard = ({ credits }: CarbonCreditCardProps) => {
  return (
    <Card className="p-4 bg-gradient-nature text-white border-none shadow-nature">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{credits}</span>
            <TrendingUp className="w-4 h-4 opacity-80" />
          </div>
          <p className="text-sm opacity-90">Carbon Credits</p>
        </div>
      </div>
    </Card>
  );
};