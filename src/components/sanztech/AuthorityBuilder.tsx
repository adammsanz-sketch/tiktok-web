import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function AuthorityBuilder() {
  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold">
          Our Workflow In Action
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          See how our templates, born from real-world challenges, have saved hundreds of hours and drastically boosted ROI for businesses just like yours. This isn't theory—it's proven strategy in action.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/my-workflow">
              Terokai Workflow Kami
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
