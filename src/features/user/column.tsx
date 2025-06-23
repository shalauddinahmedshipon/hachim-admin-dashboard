import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '@/store/userStore';
import { ArrowUpDown } from 'lucide-react';

export const columns = (): ColumnDef<User>[] => [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <span>{row.getValue("role")}</span>,
    enableColumnFilter: true,
  },
  {
    accessorKey: 'hasActiveSubscription',
    header: 'Subscription Active',
    cell: ({ row }) => {
      const active = row.getValue('hasActiveSubscription');
      return (
        <span className={active ? 'text-green-600 font-semibold' : 'text-red-600'}>
          {active ? 'Yes' : 'No'}
        </span>
      );
    },
  },
  {
    accessorKey: 'paymentDurationDays',
    header: 'Duration (days)',
    cell: ({ row }) => {
      const duration = row.getValue('paymentDurationDays')as number | null;;
      return <span>{duration ?? '-'}</span>;
    },
  },
  {
    accessorKey: 'latestPaymentDate',
    header: 'Last Payment',
    cell: ({ row }) => {
      const date = row.getValue('latestPaymentDate');
      return (
        <span>
          {date ? new Date(date as string).toLocaleDateString() : '—'}
        </span>
      );
    },
  },
  {
    accessorKey: 'totalPayments',
    header: 'Payments',
    cell: ({ row }) => {
      return <span>{row.getValue('totalPayments')}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <div
        className="flex items-center gap-2 justify-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt');
      return (
        <div>
          {new Date(createdAt as string).toLocaleDateString()}
        </div>
      );
    },
  },
];
