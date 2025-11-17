'use client';
import { SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Gem, Home, ShoppingCart, Users, BarChart2, Settings, LifeBuoy } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: BarChart2 },
  { href: '/#templates', label: 'Templates', icon: ShoppingCart },
];

export default function SidebarContent() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center space-x-2">
          <Gem className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Sanztech</span>
        </div>
      </SidebarHeader>
      <SidebarMenu>
        {menuItems.map(item => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} passHref>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <span>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/support" passHref>
              <SidebarMenuButton asChild isActive={pathname === '/support'}>
                <a>
                  <LifeBuoy className="h-5 w-5" />
                  <span>Support</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/settings" passHref>
              <SidebarMenuButton asChild isActive={pathname === '/settings'}>
                <a>
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="border-t p-2 mt-2">
           <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/admin/40/40" data-ai-hint="admin avatar" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">Admin</p>
                <p className="text-xs text-muted-foreground">admin@sanztech.com</p>
              </div>
            </div>
        </div>
      </SidebarFooter>
    </>
  )
}
