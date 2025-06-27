import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Edit, Archive, ArrowUpDown } from 'lucide-react';
import type { Video } from '@/store/videoStore';

export const columns = (
  onEdit: (video: Video) => void,
  onDelete: (id: string) => void,
  onView: (video: Video) => void
): ColumnDef<Video>[] => [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'videoUrl',
    header: 'Video',
    cell: ({ row }) => {
      const url = row.original.videoUrl;
      return url ? (
        <video
          src={url}
          className="h-24 w-24 object-cover rounded"
          muted
          controls={false}
          preload="metadata"
            onClick={() => onView(row.original)}
        />
      ) : (
        '—'
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div
        className="flex item-center gap-2 justify-center"
       
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
     cell: ({ row }) => {
      const createdAt = row.getValue('createdAt');
      return  (
      <div >
        {new Date(createdAt as string).toLocaleDateString()}
      </div>
    );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const video = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onView(video)}>
            View
          </Button>
          <Button
            className="bg-orange-300"
            variant="outline"
            onClick={() => onEdit(video)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            className="bg-red-100 hover:bg-red-300"
            variant="outline"
            onClick={() => onDelete(video.id)}
          >
            <Archive className="text-red-500 w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
