'use client';

import { useState } from 'react';
import TemplateCard from './TemplateCard';
import { templates, type Template } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

type Filter = 'All' | 'Web App' | 'Mobile';

export default function TemplateShowcase() {
  const [filter, setFilter] = useState<Filter>('All');

  const filteredTemplates = templates.filter(template => {
    if (filter === 'All') return true;
    return template.category === filter;
  });

  return (
    <section id="templates" className="py-20 md:py-28">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center mb-12 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex space-x-4">
            <Button
              variant={filter === 'All' ? 'default' : 'secondary'}
              onClick={() => setFilter('All')}
              className="rounded-full"
            >
              All Templates
            </Button>
            <Button
              variant={filter === 'Web App' ? 'default' : 'secondary'}
              onClick={() => setFilter('Web App')}
              className="rounded-full"
            >
              Web App Templates
            </Button>
            <Button
              variant={filter === 'Mobile' ? 'default' : 'secondary'}
              onClick={() => setFilter('Mobile')}
              className="rounded-full"
            >
              Mobile Templates
            </Button>
          </div>
          <Button className="rounded-full">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Template
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
}
