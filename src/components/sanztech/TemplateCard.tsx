import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import type { Template } from '@/lib/templates';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export default function TemplateCard({ template }: { template: Template }) {
  const image = PlaceHolderImages.find(img => img.id === template.imageId);

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2">
      <div className="overflow-hidden">
        <Image
          src={image?.imageUrl || ''}
          alt={template.name}
          width={600}
          height={400}
          data-ai-hint={image?.imageHint || 'abstract'}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{template.name}</CardTitle>
          <Badge variant="outline" className="flex-shrink-0">
            <Star className="w-3 h-3 mr-1 text-primary" fill="currentColor" />
            {template.rating}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {template.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <feature.icon className="w-4 h-4 mr-2 text-primary" />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch space-y-3 pt-4">
         <div className="text-2xl font-bold text-primary self-center">
          ${template.price}
        </div>
        <Button variant="outline">
          Get Mandatory FREE Tool Now
        </Button>
        <Button>
          Buy This Template (Instant Access)
        </Button>
      </CardFooter>
    </Card>
  );
}
