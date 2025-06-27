import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Archive, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AnimationImage } from '@/store/animationImageStore';

export const animationImageColumns = (
  onEdit: (img: AnimationImage) => void,
  onDelete: (id: string) => void,
  onView: (img: AnimationImage) => void
): ColumnDef<AnimationImage>[] => [
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      const img = row.original;
      return img.imageUrl ? (
        <img
          src={img.imageUrl}
          alt="Animation"
          className="w-12 h-12 rounded object-cover"
          onClick={() => onView(img)}
        />
      ) : (
        '—'
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <div
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string;
      return <div>{new Date(createdAt).toLocaleDateString()}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const img = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onView(img)}>View</Button>
          <Button variant="outline" className="bg-orange-200" onClick={() => onEdit(img)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="bg-red-100 hover:bg-red-300"
            onClick={() => onDelete(img.id)}
          >
            <Archive className="text-red-500 w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
