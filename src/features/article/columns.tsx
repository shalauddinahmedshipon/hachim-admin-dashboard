import type { ColumnDef } from "@tanstack/react-table";
import { Button } from '@/components/ui/button';
import type { Article } from '@/store/articleStore';
import { Archive, Edit } from "lucide-react";
import { ArrowUpDown } from "lucide-react"

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
     cell: ({ row }) => {
      const article:string = row.getValue('description');
         const view = row.original;
      return (
        <p onClick={() => onView(view)}>
         {article.slice(0,300)}...
        </p>
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
    header: 'Action',
    id: 'actions',
    cell: ({ row }) => {
      const article = row.original;
      return (
        <div className="flex gap-2 item-center">
          <Button variant="outline" onClick={() => onView(article)}>View</Button>
          <Button className="bg-orange-300" onClick={() => onEdit(article)}><Edit/></Button>
          <Button className="bg-red-100 hover:bg-violet-300"> <span onClick={() => onDelete(article.id)}className="text-red-500"><Archive/></span></Button>
         
        </div>
      );
    },
  },
];