'use client';
import { SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger } from '@/components/ui/sidebar';
import { Gem, Home, ShoppingCart, Users, BarChart2, Settings, LifeBuoy, Bot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: BarChart2 },
  { href: '/maya-agent', label: 'Maya Agent', icon: Bot },
  { href: '/shop', label: 'Templates', icon: ShoppingCart },
];

export default function SidebarContent() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gem className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">Sanztech</span>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarMenu>
        {menuItems.map(item => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} passHref prefetch={false}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                <span>
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/support" passHref prefetch={false}>
              <SidebarMenuButton asChild isActive={pathname === '/support'} tooltip="Support">
                <span>
                  <LifeBuoy className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">Support</span>
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/settings" passHref prefetch={false}>
              <SidebarMenuButton asChild isActive={pathname === '/settings'} tooltip="Settings">
                <span>
                  <Settings className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="border-t p-2 mt-2">
           <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/adam-profile.jpg.png" data-ai-hint="admin avatar" onError={(e) => { (e.target as HTMLImageElement).src = '/avatar.svg'; }} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="group-data-[collapsible=icon]:hidden">
                <p className="font-semibold text-sm">Admin</p>
                <p className="text-xs text-muted-foreground">admin@sanztech.com</p>
              </div>
            </div>
        </div>
      </SidebarFooter>
    </>
  )
}
