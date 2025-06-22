import type { ColumnDef } from "@tanstack/react-table";
import { Button } from '@/components/ui/button';
import type { Article } from '@/store/articleStore';

export const columns = (
  onEdit: (article: Article) => void,
  onDelete: (id: string) => void,
  onView: (article: Article) => void
): ColumnDef<Article>[] => [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const article = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onView(article)}>View</Button>
          <Button onClick={() => onEdit(article)}>Edit</Button>
          <Button variant="destructive" onClick={() => onDelete(article.id)}>Delete</Button>
        </div>
      );
    },
  },
];