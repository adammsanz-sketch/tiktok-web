'use client';
import StatCard from '@/components/sanztech/dashboard/StatCard';
import SalesChart from '@/components/sanztech/dashboard/SalesChart';
import CustomerChart from '@/components/sanztech/dashboard/CustomerChart';
import RecentSales from '@/components/sanztech/dashboard/RecentSales';
import { DollarSign, Users, ShoppingBag, ArrowUp, ArrowDown } from 'lucide-react';
import { salesData, customerData, recentSales } from '@/lib/dashboard-data';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Total Sales"
          value="$45,231.89"
          icon={DollarSign}
          trend="+20.1% from last month"
          trendDirection="up"
        />
        <StatCard 
          title="Total Buyers"
          value="+2350"
          icon={Users}
          trend="+180.1% from last month"
          trendDirection="up"
        />
        <StatCard 
          title="Store Visits"
          value="+12,234"
          icon={ShoppingBag}
          trend="+19% from last month"
          trendDirection="down"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <SalesChart data={salesData} />
        </div>
        <div className="lg:col-span-2">
          <CustomerChart data={customerData} />
        </div>
      </div>
      <div>
        <RecentSales sales={recentSales} />
      </div>
    </div>
  );
}
