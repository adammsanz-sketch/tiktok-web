import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SidebarContent from '@/components/sanztech/dashboard/SidebarContent';
import Header from '@/components/sanztech/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
