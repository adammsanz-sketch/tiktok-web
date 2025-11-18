import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SidebarContent from '@/components/sanztech/dashboard/SidebarContent';
import Header from '@/components/sanztech/dashboard/Header';

export default function MayaAgentPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center p-8">
                <h1 className="text-4xl font-bold text-[hsl(var(--gold))] mb-4">Maya Agent</h1>
                <p className="text-gray-300">This page is under construction.</p>
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
