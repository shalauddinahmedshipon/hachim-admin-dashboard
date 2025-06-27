import { useEffect, useState } from 'react';
import { useAnimationImageStore, type AnimationImage } from '@/store/animationImageStore';
import { Toaster, toast } from 'sonner';
import { DataTable } from '@/components/ui/data-table';
import { animationImageColumns } from '@/features/animationImage/columns';
import { AnimationImageForm } from '@/features/animationImage/AnimationImageForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function AnimationImagePage() {
  const {
    animationImages,
    fetchAnimationImages,
    addAnimationImage,
    updateAnimationImage,
    deleteAnimationImage,
  } = useAnimationImageStore();

  const [openCreate, setOpenCreate] = useState(false);
  const [editImage, setEditImage] = useState<AnimationImage | null>(null);
  const [viewImage, setViewImage] = useState<AnimationImage | null>(null);

  useEffect(() => {
    fetchAnimationImages();
  }, []);

  const handleDelete = (id: string) => {
    const toastId = toast(
      <div className="flex flex-col gap-4 p-4 max-w-xs">
        <p>Are you sure you want to delete this image?</p>
        <div className="flex justify-end gap-2">
          <Button size="sm" onClick={() => toast.dismiss(toastId)}>Cancel</Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={async () => {
              toast.dismiss(toastId);
              try {
                await deleteAnimationImage(id);
                toast.success('Image deleted successfully');
              } catch {
                toast.error('Failed to delete image');
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
      <Toaster richColors position="top-right" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Animation Images</h2>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-gray-300">
              <PlusCircle /> Create Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Animation Image</DialogTitle>
            </DialogHeader>
            <AnimationImageForm
              onSubmit={async (formData) => {
                try {
                  await addAnimationImage(formData);
                  toast.success('Image added successfully');
                  setOpenCreate(false);
                } catch {
                  toast.error('Failed to add image');
                }
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={animationImageColumns(setEditImage, handleDelete, setViewImage)}
        data={animationImages}
        // filterColumnKey="createdAt"
      />

      <Dialog open={!!editImage} onOpenChange={() => setEditImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          {editImage && (
            <AnimationImageForm
              defaultImage={editImage}
              onSubmit={async (formData) => {
                try {
                  await updateAnimationImage(editImage.id, formData);
                  toast.success('Image updated successfully');
                  setEditImage(null);
                } catch {
                  toast.error('Failed to update image');
                }
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewImage} onOpenChange={() => setViewImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {viewImage?.imageUrl && (
            <div className="flex justify-center">
              <img
                src={viewImage.imageUrl}
                alt="Preview"
                className="max-h-[300px] rounded border"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
