import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Toaster } from 'sonner';
import { usePaymentStore } from '@/store/paymentStore';
import { PaymentColumns } from '@/features/payment/columns';

export default function Payment() {
  const { payments, total, fetchPayments } = usePaymentStore();
  const [amountFilter, setAmountFilter] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-4">
      <Toaster position="top-right" />

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Payments (Total: {total})</h2>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Filter by amount"
            value={amountFilter}
            onChange={(e) => setAmountFilter(e.target.value)}
            className="border p-2 rounded"
          />
          <Button onClick={() => fetchPayments(amountFilter)}>Search</Button>
        </div>
      </div>

      <DataTable data={payments}   filterColumnKey="email" columns={PaymentColumns()} />
    </div>
  );
}
