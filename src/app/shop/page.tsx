'use client';

import { Suspense } from 'react';
import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SidebarContent from '@/components/sanztech/dashboard/SidebarContent';
import Header from '@/components/sanztech/dashboard/Header';
import TemplateShowcase from '@/components/sanztech/TemplateShowcase';
import DiscountBanner from '@/components/sanztech/DiscountBanner';
import { useSearchParams } from 'next/navigation';

function ShopPageContent() {
  const searchParams = useSearchParams();
  const showDiscount = searchParams.get('affiliate_success') === 'true';

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {showDiscount && <DiscountBanner />}
          <TemplateShowcase />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopPageContent />
    </Suspense>
  );
}
