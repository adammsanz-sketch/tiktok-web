import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
} from 'lucide-react';
import StatCard from '@/components/sanztech/dashboard/StatCard';
import SalesChart from '@/components/sanztech/dashboard/SalesChart';
import CustomerChart from '@/components/sanztech/dashboard/CustomerChart';
import RecentSales from '@/components/sanztech/dashboard/RecentSales';
import { salesData, customerData, recentSales } from '@/lib/dashboard-data';

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          trend="+20.1% from last month"
          trendDirection="up"
        />
        <StatCard
          title="Subscriptions"
          value="+2350"
          icon={Users}
          trend="+180.1% from last month"
          trendDirection="up"
        />
        <StatCard
          title="Sales"
          value="+12,234"
          icon={CreditCard}
          trend="+19% from last month"
          trendDirection="up"
        />
        <StatCard
          title="Active Now"
          value="+573"
          icon={Activity}
          trend="+201 since last hour"
          trendDirection="down"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <SalesChart data={salesData} />
        <CustomerChart data={customerData} />
      </div>
       <div className="mt-4">
          <RecentSales sales={recentSales} />
        </div>
    </>
  );
}
