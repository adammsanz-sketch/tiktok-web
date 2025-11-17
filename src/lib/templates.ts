import type { LucideIcon } from 'lucide-react';
import { Database, Users, Zap, Smartphone, Globe } from 'lucide-react';

export type Template = {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: 'Web App' | 'Mobile';
  imageId: string;
  features: {
    icon: LucideIcon;
    text: string;
  }[];
};

export const templates: Template[] = [
  {
    id: 'TPL001',
    name: 'Sales CRM Pipeline',
    price: 49.99,
    rating: 4.8,
    category: 'Web App',
    imageId: 'TPL001_image',
    features: [
      { icon: Zap, text: 'Automated Follow-ups' },
      { icon: Database, text: 'Pipedrive Integrated' },
      { icon: Users, text: 'Client Management' },
    ],
  },
  {
    id: 'TPL002',
    name: 'E-commerce Inventory',
    price: 79.99,
    rating: 4.9,
    category: 'Web App',
    imageId: 'TPL002_image',
    features: [
      { icon: Globe, text: 'Web-based' },
      { icon: Database, text: 'Stock Management' },
      { icon: Zap, text: 'Low Stock Alerts' },
    ],
  },
  {
    id: 'TPL003',
    name: 'Mobile Task Manager',
    price: 29.99,
    rating: 4.5,
    category: 'Mobile',
    imageId: 'TPL003_image',
    features: [
      { icon: Smartphone, text: 'iOS & Android' },
      { icon: Users, text: 'Team Collaboration' },
      { icon: Zap, text: 'Push Notifications' },
    ],
  },
    {
    id: 'TPL004',
    name: 'Social Media Scheduler',
    price: 39.99,
    rating: 4.7,
    category: 'Web App',
    imageId: 'TPL004_image',
    features: [
      { icon: Globe, text: 'Multi-platform' },
      { icon: Zap, text: 'Auto-posting' },
      { icon: Users, text: 'Audience Analytics' },
    ],
  },
  {
    id: 'TPL005',
    name: 'Mobile Fitness Tracker',
    price: 34.99,
    rating: 4.6,
    category: 'Mobile',
    imageId: 'TPL005_image',
    features: [
      { icon: Smartphone, text: 'Cross-platform' },
      { icon: Database, text: 'Workout Logging' },
      { icon: Users, text: 'Community Features' },
    ],
  },
  {
    id: 'TPL006',
    name: 'Project Management Suite',
    price: 99.99,
    rating: 4.9,
    category: 'Web App',
    imageId: 'TPL006_image',
    features: [
      { icon: Globe, text: 'Cloud-based' },
      { icon: Users, text: 'Team Dashboards' },
      { icon: Zap, text: 'Automated Reporting' },
    ],
  },
];
