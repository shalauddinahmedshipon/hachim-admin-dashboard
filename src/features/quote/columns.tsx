import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Edit, Archive } from 'lucide-react';
import type { Quote } from '@/store/quoteStore';

export const columns = (
  onEdit: (quote: Quote) => void,
  onDelete: (id: string) => void,
  onView: (quote: Quote) => void
): ColumnDef<Quote>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'quote',
    header: 'Quote',
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      const url = row.original.imageUrl;
      return url ? (
        <img
          src={url}
          alt="Quote"
          className="h-12 w-12 object-cover rounded"
        />
      ) : (
        '—'
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return date ? new Date(date).toLocaleDateString() : '—';
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const quote = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onView(quote)}>
            View
          </Button>
          <Button
            className="bg-orange-300"
            variant="outline"
            onClick={() => onEdit(quote)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            className="bg-red-100 hover:bg-red-300"
            variant="outline"
            onClick={() => onDelete(quote.id)}
          >
            <Archive className="text-red-500 w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
