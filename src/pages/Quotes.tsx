import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useQuoteStore, type Quote } from '@/store/quoteStore';
import { QuoteForm } from '@/features/quote/QuoteForm';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/features/quote/columns';
import { Toaster, toast } from 'sonner';
import { PlusCircle } from 'lucide-react';

export default function QuotePage() {
  const {
    quotes,
    fetchQuotes,
    addQuote,
    updateQuote,
    deleteQuote,
  } = useQuoteStore();

  const [viewQuote, setViewQuote] = useState<Quote | null>(null);
  const [editQuote, setEditQuote] = useState<Quote | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDelete = (quoteId: string) => {
    const id = toast(
      <div className="flex flex-col gap-4 p-4 max-w-xs">
        <p>Are you sure you want to delete this quote?</p>
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
                await deleteQuote(quoteId);
                toast.success("Quote deleted successfully");
              } catch {
                toast.error("Failed to delete quote");
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
        <h2 className="text-xl font-bold">Quotes</h2>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-gray-300">
              <PlusCircle /> Create Quote
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Quote</DialogTitle>
            </DialogHeader>
            <QuoteForm
              onSubmit={async (data) => {
                try {
                  await addQuote(data);
                  toast.success("Quote created successfully");
                  setOpenCreate(false);
                } catch {
                  toast.error("Failed to create quote");
                }
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns(setEditQuote, handleDelete, setViewQuote)}
        data={quotes}
        filterColumnKey="name"
      />

      <Dialog open={!!editQuote} onOpenChange={() => setEditQuote(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Quote</DialogTitle>
          </DialogHeader>
          {editQuote && (
            <QuoteForm
              defaultValues={editQuote}
              onSubmit={async (data) => {
                try {
                  await updateQuote(editQuote.id, data);
                  toast.success("Quote updated successfully");
                  setEditQuote(null);
                } catch {
                  toast.error("Failed to update quote");
                }
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewQuote} onOpenChange={() => setViewQuote(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quote Details</DialogTitle>
          </DialogHeader>
          {viewQuote && (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              <p className="font-semibold text-lg">{viewQuote.name}</p>
              <p className="text-sm">{viewQuote.quote}</p>
                            <div className='flex justify-center item-center w-full'>
   {viewQuote.imageUrl && (
                <img
                  src={viewQuote.imageUrl}
                  alt="quote"
                  className="rounded mt-2 max-h-60"
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
