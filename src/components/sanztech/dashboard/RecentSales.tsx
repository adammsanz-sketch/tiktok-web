import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Sale {
  name: string;
  email: string;
  amount: string;
  avatar: string;
  avatarFallback: string;
  imageHint: string;
}

interface RecentSalesProps {
  sales: Sale[];
}

export default function RecentSales({ sales }: RecentSalesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          {sales.length === 0 ? 'No recent sales yet.' : 'Latest transactions.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {sales.length === 0 ? (
            <p className="text-sm text-muted-foreground">Data will appear when available.</p>
          ) : (
            sales.map((sale, index) => (
              <div key={index} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={sale.avatar} alt="Avatar" data-ai-hint={sale.imageHint} />
                  <AvatarFallback>{sale.avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{sale.name}</p>
                  <p className="text-sm text-muted-foreground">{sale.email}</p>
                </div>
                <div className="ml-auto font-medium">{sale.amount}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
