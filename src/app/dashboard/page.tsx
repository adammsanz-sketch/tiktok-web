import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SidebarContent from '@/components/sanztech/dashboard/SidebarContent';
import Header from '@/components/sanztech/dashboard/Header';
import StatCard from '@/components/sanztech/dashboard/StatCard';
import SalesChart from '@/components/sanztech/dashboard/SalesChart';
import CustomerChart from '@/components/sanztech/dashboard/CustomerChart';
import RecentSales from '@/components/sanztech/dashboard/RecentSales';
import { salesData, customerData, recentSales } from '@/lib/dashboard-data';
import { DollarSign, Users, Store } from 'lucide-react';

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <StatCard
              title="Total Sales"
              value="—"
              icon={DollarSign}
              trend="—"
              trendDirection="up"
            />
            <StatCard
              title="New Customers"
              value="—"
              icon={Users}
              trend="—"
              trendDirection="up"
            />
            <StatCard
              title="Store Visits"
              value="—"
              icon={Store}
              trend="—"
              trendDirection="down"
            />
          </div>
          <div className="mt-8 grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2 grid auto-rows-max items-start gap-4 md:gap-8">
              <SalesChart data={salesData} />
              <CustomerChart data={customerData} />
            </div>
            <RecentSales sales={recentSales} />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
