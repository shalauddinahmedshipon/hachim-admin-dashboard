import type { ColumnDef } from '@tanstack/react-table';
import type { Payment } from '@/store/paymentStore';

export const PaymentColumns = (): ColumnDef<Payment>[] => [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'durationDays',
    header: 'Duration (Days)',
  },
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
  },
  {
    accessorKey: 'subscription',
    header: 'Subscribed',
    cell: ({ row }) => (row.original.subscription ? 'Yes' : 'No'),
  },
  
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
];
