import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useRef, useState, useEffect } from 'react';
import { Upload, Loader2 } from 'lucide-react';

const schema = z.object({
  title: z.string().min(1),
});

export type VideoFormFields = z.infer<typeof schema>;

export const VideoForm = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: FormData) => void;
  defaultValues?: Partial<VideoFormFields>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<VideoFormFields>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || { title: '' },
  });

  // Reset selected file if defaultValues change (e.g., on edit)
  useEffect(() => {
    setSelectedFile(null);
  }, [defaultValues]);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', data.title);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[550px] overflow-y-auto">
      <Input {...form.register('title')} placeholder="Title" disabled={isSubmitting} />

      <label
        htmlFor="file-upload"
        className="inline-flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
      >
        <Upload className="w-5 h-5" />
        <span>{selectedFile ? selectedFile.name : 'Choose a video file'}</span>
      </label>
      <input
        id="file-upload"
        type="file"
        ref={fileInputRef}
        className="hidden"
        disabled={isSubmitting}
        accept="video/*"
        onChange={handleFileChange}
      />

      {selectedFile && (
        <div className="mt-2 text-sm text-gray-600">
          <p><strong>Filename:</strong> {selectedFile.name}</p>
          <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          <p><strong>Type:</strong> {selectedFile.type}</p>
        </div>
      )}

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              Uploading...
            </span>
          ) : (
            'Submit'
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};
