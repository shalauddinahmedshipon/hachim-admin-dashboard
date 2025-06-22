import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useRef, useState, useEffect } from 'react';
import { Upload, Loader2 } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1),
  quote: z.string().min(1),
});

export type QuoteFormFields = z.infer<typeof schema>;

export const QuoteForm = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: FormData) => void;
  defaultValues?: Partial<QuoteFormFields>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<QuoteFormFields>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || { name: '', quote: '' },
  });

  // Update preview URL when selected file changes
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    // Cleanup on unmount or when file changes
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('quote', data.quote);
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
      <Input {...form.register('name')} placeholder="Name" disabled={isSubmitting} />
      <Textarea {...form.register('quote')} placeholder="Quote" className="min-h-[160px]" disabled={isSubmitting} />

      <label
        htmlFor="file-upload"
        className="inline-flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
      >
        <Upload className="w-5 h-5" />
        <span>{selectedFile ? selectedFile.name : 'Choose a file'}</span>
      </label>
      <input
        id="file-upload"
        type="file"
        ref={fileInputRef}
        className="hidden"
        disabled={isSubmitting}
        accept="image/*"
        onChange={handleFileChange}
      />

      {selectedFile && (
        <div className="mt-2 flex flex-col items-start gap-2">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Selected preview"
              className="max-w-[100px] max-h-[100px] rounded border"
            />
          )}
          <div className="text-sm text-gray-600">
            <p><strong>Filename:</strong> {selectedFile.name}</p>
            <p><strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
            <p><strong>Type:</strong> {selectedFile.type}</p>
          </div>
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
