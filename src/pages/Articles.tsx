import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useArticleStore, type Article } from '@/store/articleStore';
import { ArticleForm } from '@/features/article/ArticleForm';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/features/article/columns';
import { Toaster, toast } from 'sonner';
import { PlusCircle } from 'lucide-react';

export default function ArticlePage() {
  const {
    articles,
    fetchArticles,
    addArticle,
    updateArticle,
    deleteArticle,
  } = useArticleStore();

  const [viewArticle, setViewArticle] = useState<Article | null>(null);
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  // Confirm delete with toast
const handleDelete = (articleId: string) => {
  const id = toast(
    <div className="flex flex-col gap-4 p-4 max-w-xs">
      <p>Are you sure you want to delete this article?</p>
      <div className="flex justify-end gap-2">
        <Button size="sm" onClick={() => toast.dismiss(id)}>
          Cancel
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={async () => {
            toast.dismiss(id);
            try {
              await deleteArticle(articleId);
              toast.success("Article deleted successfully");
            } catch {
              toast.error("Failed to delete article");
            }
          }}
        >
          Delete
        </Button>
      </div>
    </div>,
    { duration: Infinity }
  );
};


  return (
    <div className="p-4">
      {/* Sonner Toaster */}
      <Toaster richColors position="top-right" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Articles</h2>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-gray-300"><PlusCircle/> Create Article</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
            </DialogHeader>
            <ArticleForm
              onSubmit={async (data) => {
                try {
                  await addArticle(data);
                  toast.success("Article created successfully");
                  setOpenCreate(false);
                } catch {
                  toast.error("Failed to create article");
                }
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns(setEditArticle, handleDelete, setViewArticle)}
        data={articles}
        filterColumnKey="title"
      />

      <Dialog open={!!editArticle} onOpenChange={() => setEditArticle(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          {editArticle && (
            <ArticleForm
              defaultValues={editArticle}
              onSubmit={async (data) => {
                try {
                  await updateArticle(editArticle.id, data);
                  toast.success("Article updated successfully");
                  setEditArticle(null);
                } catch {
                  toast.error("Failed to update article");
                }
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewArticle} onOpenChange={() => setViewArticle(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Article Details</DialogTitle>
          </DialogHeader>
          {viewArticle && (
            <div className="space-y-2 max-h-[500px] overflow-y-scroll">
              <p className='font-semibold text-2xl'>
              {viewArticle.title}
              </p>
              <p>
                {viewArticle.description}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
