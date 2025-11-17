import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendDirection: 'up' | 'down';
}

export default function StatCard({ title, value, icon: Icon, trend, trendDirection }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span className={cn('mr-1', trendDirection === 'up' ? 'text-green-500' : 'text-red-500')}>
            {trendDirection === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          </span>
          {trend}
        </p>
      </CardContent>
    </Card>
  );
}
