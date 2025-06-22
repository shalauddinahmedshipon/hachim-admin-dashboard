import { create } from 'zustand';
import { fetchWithAuth } from '@/utils/fetchWithAuth';

export type Quote = {
  id: string;
  name: string;
  quote: string;
  imageUrl: string | null;
  cloudinaryPublicId: string | null;
  createdAt: string;
};

type QuoteState = {
  quotes: Quote[];
  selectedQuote: Quote | null;
  loading: boolean;
  error: string | null;
  fetchQuotes: () => Promise<void>;
  addQuote: (data: FormData) => Promise<void>;
  updateQuote: (id: string, data: FormData) => Promise<void>;
  deleteQuote: (id: string) => Promise<void>;
  fetchQuoteById: (id: string) => Promise<void>;
};

export const useQuoteStore = create<QuoteState>((set, get) => ({
  quotes: [],
  selectedQuote: null,
  loading: false,
  error: null,

  fetchQuotes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/quote`);
      const data = await res.json();
      set({ quotes: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchQuoteById: async (id) => {
    try {
      set({ loading: true });
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/quote/${id}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      set({ selectedQuote: result.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addQuote: async (formData) => {
    await fetchWithAuth(`${import.meta.env.VITE_API_URL}/quote/create`, {
      method: 'POST',
      body: formData,
    });
    await get().fetchQuotes();
  },

  updateQuote: async (id, formData) => {
    await fetchWithAuth(`${import.meta.env.VITE_API_URL}/quote/${id}`, {
      method: 'PATCH',
      body: formData,
    });
    await get().fetchQuotes();
  },

  deleteQuote: async (id) => {
    await fetchWithAuth(`${import.meta.env.VITE_API_URL}/quote/${id}`, {
      method: 'DELETE',
    });
    await get().fetchQuotes();
  },
}));
