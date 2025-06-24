// pages/SubscriptionsPage.tsx
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { DataTable } from '@/components/ui/data-table';
import { PlusCircle } from 'lucide-react';
import { Toaster } from 'sonner';
import { SubscriptionForm } from '@/features/subscription/SubscriptionForm';
import { SubscriptionColumns } from '@/features/subscription/columns';
import { useSubscriptionStore } from '@/store/subscriptionStore';

export default function Subscription() {
  const { subscriptions, fetchSubscriptions, createSubscription, deleteSubscription, toggleActive } = useSubscriptionStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="p-4">
      <Toaster position="top-right" />
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Subscriptions</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600"><PlusCircle className="mr-2" />Create</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Subscription</DialogTitle>
            </DialogHeader>
            <SubscriptionForm
              onSubmit={async (data) => {
                await createSubscription(data);
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        data={subscriptions}
        columns={SubscriptionColumns({ onDelete: deleteSubscription, onToggleActive: toggleActive })}
      />
    </div>
  );
}
