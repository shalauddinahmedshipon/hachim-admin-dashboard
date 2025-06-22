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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Articles</h2>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button>Create Article</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
            </DialogHeader>
            <ArticleForm
              onSubmit={(data) => {
                addArticle(data);
                setOpenCreate(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns(setEditArticle, deleteArticle, setViewArticle)} data={articles} />

      <Dialog open={!!editArticle} onOpenChange={() => setEditArticle(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          {editArticle && (
            <ArticleForm
              defaultValues={editArticle}
              onSubmit={(data) => {
                updateArticle(editArticle.id, data);
                setEditArticle(null);
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
            <div className="space-y-2">
              <p><strong>Title:</strong> {viewArticle.title}</p>
              <p><strong>Description:</strong> {viewArticle.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
