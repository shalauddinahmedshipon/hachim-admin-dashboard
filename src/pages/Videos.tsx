import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useVideoStore, type Video } from '@/store/videoStore';
import { VideoForm } from '@/features/video/VideoForm';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/features/video/columns';
import { Toaster, toast } from 'sonner';
import { PlusCircle } from 'lucide-react';

export default function Videos() {
  const {
    videos,
    fetchVideos,
    addVideo,
    updateVideo,
    deleteVideo,
  } = useVideoStore();

  const [viewVideo, setViewVideo] = useState<Video | null>(null);
  const [editVideo, setEditVideo] = useState<Video | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = (videoId: string) => {
    const id = toast(
      <div className="flex flex-col gap-4 p-4 max-w-xs">
        <p>Are you sure you want to delete this video?</p>
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
                await deleteVideo(videoId);
                toast.success("Video deleted successfully");
              } catch {
                toast.error("Failed to delete video");
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
        <h2 className="text-xl font-bold">Videos</h2>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-gray-300">
              <PlusCircle /> Create Video
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Video</DialogTitle>
            </DialogHeader>
            <VideoForm
              onSubmit={async (data) => {
                try {
                  await addVideo(data);
                  toast.success("Video created successfully");
                  setOpenCreate(false);
                } catch {
                  toast.error("Failed to create video");
                }
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns(setEditVideo, handleDelete, setViewVideo)}
        data={videos}
        filterColumnKey="title"
      />

      <Dialog open={!!editVideo} onOpenChange={() => setEditVideo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
          </DialogHeader>
          {editVideo && (
            <VideoForm
              defaultValues={editVideo}
              onSubmit={async (data) => {
                try {
                  await updateVideo(editVideo.id, data);
                  toast.success("Video updated successfully");
                  setEditVideo(null);
                } catch {
                  toast.error("Failed to update video");
                }
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewVideo} onOpenChange={() => setViewVideo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Video Details</DialogTitle>
          </DialogHeader>
          {viewVideo && (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              <p className="font-semibold text-lg">{viewVideo.title}</p>
              <div className='flex justify-center item-center w-full'>
                {viewVideo.videoUrl && (
                <video
                  controls
                  src={viewVideo.videoUrl}
                  className="rounded my-2 max-w-full max-h-60"
                />
              )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
