import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export type ArticleFormData = z.infer<typeof schema>;

export const ArticleForm = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: ArticleFormData) => void;
  defaultValues?: ArticleFormData;
}) => {
  const form = useForm<ArticleFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || { title: '', description: '' },
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input {...form.register('title')} placeholder="Title" />
      <Input {...form.register('description')} placeholder="Description" />
      <DialogFooter>
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  );
};
