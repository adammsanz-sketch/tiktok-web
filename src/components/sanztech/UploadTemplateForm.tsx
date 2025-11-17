'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Template } from '@/lib/templates';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Template name must be at least 2 characters.',
  }),
  price: z.coerce.number().min(0, {
    message: 'Price must be a positive number.',
  }),
  category: z.enum(['Web App', 'Mobile']),
  features: z.string().min(10, {
    message: 'Please list at least one feature, separated by commas.',
  }),
  image: z.any().optional(),
});

type UploadTemplateFormValues = z.infer<typeof formSchema>;

interface UploadTemplateFormProps {
  onTemplateUploaded: () => void;
  template?: Template;
}

export default function UploadTemplateForm({ onTemplateUploaded, template }: UploadTemplateFormProps) {
  const { toast } = useToast();
  const isEditMode = !!template;

  const form = useForm<UploadTemplateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: template?.name || '',
      price: template?.price || 0,
      category: template?.category || 'Web App',
      features: template?.features.map(f => f.text).join(', ') || '',
    },
  });
  
  // Conditionally make image required only when not in edit mode
  if (!isEditMode) {
    formSchema.extend({
      image: z.any().refine(files => files?.length === 1, 'Image is required.'),
    })
  }


  function onSubmit(values: UploadTemplateFormValues) {
    console.log(values);
    if (isEditMode) {
      toast({
        title: 'Template Updated!',
        description: `${values.name} has been successfully updated.`,
      });
    } else {
      toast({
        title: 'Template Uploaded!',
        description: `${values.name} has been successfully uploaded.`,
      });
    }
    onTemplateUploaded();
  }
  
  const fileRef = form.register('image');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Sales CRM Pipeline" {...field} className="text-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="49.99" {...field} className="text-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Web App">Web App</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter features, separated by commas (e.g., Automated Follow-ups, Pipedrive Integrated)"
                  {...field}
                  className="text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isEditMode && (
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Template Image</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" {...fileRef} className="text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">{isEditMode ? 'Save Changes' : 'Upload Template'}</Button>
      </form>
    </Form>
  );
}
