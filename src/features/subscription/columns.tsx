// features/subscription/columns.tsx
import type { ColumnDef } from '@tanstack/react-table';

export const SubscriptionColumns = ({ onDelete, onToggleActive }: any): ColumnDef<any>[] => [
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'durationDays',
    header: 'Duration (days)',
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <button
          onClick={() => onToggleActive(row.original.id, isActive)}
          className={`px-2 py-1 text-sm text-white rounded ${isActive ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </button>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <button
        onClick={() => onDelete(row.original.id)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    ),
  },
];
