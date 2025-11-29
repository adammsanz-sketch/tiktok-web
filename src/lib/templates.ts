import type { LucideIcon } from 'lucide-react';
import { Database, Users, Zap, Smartphone, Globe } from 'lucide-react';

export type Template = {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: 'Web App' | 'Mobile';
  imageId: string;
  checkoutUrl?: string;
  features: {
    icon: string; // Storing icon name as string
    text: string;
  }[];
};

export const iconMap: { [key: string]: LucideIcon } = {
  Zap,
  Database,
  Users,
  Smartphone,
  Globe,
};
