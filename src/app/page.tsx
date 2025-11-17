import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SidebarContent from '@/components/sanztech/dashboard/SidebarContent';
import Header from '@/components/sanztech/dashboard/Header';

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Welcome to Sanztech</h1>
            <p className="text-muted-foreground">Select a page from the sidebar to get started.</p>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
