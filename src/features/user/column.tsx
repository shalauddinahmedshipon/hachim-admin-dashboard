import type { ColumnDef } from '@tanstack/react-table';
import { useUserStore, type User } from '@/store/userStore';
import { ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { useAuthStore } from '@/store/useAuthStore';
import { useState } from 'react';

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
  id: 'blockedToggle',
  header: 'Blocked',
  cell: ({ row }) => {
    const user = row.original;
    const isBlocked = user.isBlocked ?? false;
    const { toggleBlockUser } = useUserStore();
    const currentUserRole = useAuthStore((state) => state.user?.role);
    const [checked, setChecked] = useState(isBlocked);

    const isTargetSuperAdmin = user.role === 'SUPER_ADMIN';

    const handleToggle = async () => {
      if (isTargetSuperAdmin) {
        toast.error("Cannot block/unblock a SUPER_ADMIN");
        return;
      }

      try {
        // Optimistic update
        setChecked(!checked);
        await toggleBlockUser(user.id, !checked);
        toast.success(`User ${!checked ? 'blocked' : 'unblocked'} successfully.`);
      } catch (error: any) {
        setChecked(checked); // revert toggle on error
        toast.error(error.message || 'Failed to update block status');
      }
    };

    // Only ADMIN and SUPER_ADMIN can toggle, others see text only
    if (currentUserRole !== 'ADMIN' && currentUserRole !== 'SUPER_ADMIN') {
      return <span>{checked ? 'Blocked' : 'Active'}</span>;
    }

    return (
      <Switch
        checked={checked}
        disabled={isTargetSuperAdmin}
        onCheckedChange={handleToggle}
        aria-label={`Toggle block for user ${user.email}`}
      />
    );
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
