import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Edit, Trash2 } from 'lucide-react';
import type { Template } from '@/lib/templates';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadTemplateForm from './UploadTemplateForm';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { iconMap } from '@/lib/templates';
import { useFirebase } from '@/firebase';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc } from 'firebase/firestore';


export default function TemplateCard({ template }: { template: Template }) {
  const image = PlaceHolderImages.find(img => img.id === template.imageId);
  const isAdmin = true; // Placeholder for admin check
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const { firestore } = useFirebase();

  const handleTemplateUpdated = () => {
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    if (!firestore) {
      toast({
        title: 'Error',
        description: 'Firestore is not available.',
        variant: 'destructive'
      });
      return;
    }
    const templateRef = doc(firestore, 'templates', template.id);
    deleteDocumentNonBlocking(templateRef);
    toast({
      title: 'Template Deleted!',
      description: `${template.name} has been successfully deleted.`,
      variant: 'destructive'
    });
  }

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2">
      <div className="overflow-hidden relative">
        <Image
          src={image?.imageUrl || 'https://picsum.photos/seed/placeholder/600/400'}
          alt={template.name}
          width={600}
          height={400}
          data-ai-hint={image?.imageHint || 'abstract'}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
        />
        {isAdmin && (
          <div className="absolute top-2 right-2 flex space-x-2">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Template</DialogTitle>
                </DialogHeader>
                <UploadTemplateForm onTemplateUploaded={handleTemplateUpdated} template={template} />
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    template &quot;{template.name}&quot;.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
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
          {template.features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <li key={index} className="flex items-center">
                {Icon && <Icon className="w-4 h-4 mr-2 text-primary" />}
                <span>{feature.text}</span>
              </li>
            );
          })}
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
