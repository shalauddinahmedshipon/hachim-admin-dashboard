// features/user/UserForm.tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserFormData = z.infer<typeof schema>;

export const UserForm = ({ onSubmit }: { onSubmit: (data: UserFormData) => void }) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Email" {...form.register('email')} />
      <Input placeholder="Password" type="password" {...form.register('password')} />
      <DialogFooter>
        <Button type="submit">Create Admin</Button>
      </DialogFooter>
    </form>
  );
};
