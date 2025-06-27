import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Upload, Loader2 } from 'lucide-react';

const schema = z.object({
  
});

type FormFields = z.infer<typeof schema>;

export const AnimationImageForm = ({
  onSubmit,
  defaultImage,
}: {
  onSubmit: (data: FormData) => void;
  defaultImage?: { imageUrl: string | null };
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage?.imageUrl ?? null);

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!selectedFile) return;
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleSubmit = form.handleSubmit(async () => {
    if (!selectedFile) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[550px] overflow-y-auto">
      {/* File Upload */}
      <label
        htmlFor="file-upload"
        className="inline-flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900 max-w-full overflow-hidden"
      >
        <Upload className="w-5 h-5 shrink-0" />
        <span className="truncate block max-w-[220px] text-sm">
          {selectedFile?.name || 'Choose a file'}
        </span>
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

      {/* Image Preview */}
      {previewUrl && (
        <div className="mt-2 flex flex-col items-start gap-2">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-[120px] max-h-[120px] rounded border"
          />
          {selectedFile && (
            <div className="text-sm text-gray-600 max-w-full break-words">
              <p><strong>Filename:</strong> {selectedFile.name}</p>
              <p><strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
              <p><strong>Type:</strong> {selectedFile.type}</p>
            </div>
          )}
        </div>
      )}

      {/* Submit */}
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
