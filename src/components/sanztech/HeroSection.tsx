import { Star, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary animate-fade-in-down">
          STOP Doing Manual Follow-ups!
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Get Pipedrive for FREE, Use Our Templates for Immediate Profit.
        </p>
        <div className="mt-8 flex justify-center items-center space-x-6">
          <div className="flex items-center space-x-1">
            <Star className="text-primary" fill="currentColor" />
            <Star className="text-primary" fill="currentColor" />
            <Star className="text-primary" fill="currentColor" />
            <Star className="text-primary" fill="currentColor" />
            <Star className="text-primary/50" fill="currentColor" />
            <span className="ml-2 font-medium">4.8/5.0 Rating</span>
          </div>
          <Badge variant="outline" className="text-sm py-1 px-3 border-green-500/50 text-green-400">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Trusted by 500+ Businesses
          </Badge>
        </div>
      </div>
    </section>
  );
}
