import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">My Workflow</h1>
      <p className="text-lg text-muted-foreground mb-8">This is your workflow page. You can customize it as you like.</p>
      <Button asChild>
        <Link href="/">Go back to Home</Link>
      </Button>
    </div>
  )
}
