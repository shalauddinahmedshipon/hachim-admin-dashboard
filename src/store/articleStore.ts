// store/articleStore.ts
import { create } from 'zustand';
import { fetchWithAuth } from '@/utils/fetchWithAuth';

export type Article = {
  id: string;
  title: string;
  description: string;
};

type ArticleState = {
  articles: Article[];
  selectedArticle: Article | null;
  loading: boolean;
  error: string | null;
  fetchArticles: () => Promise<void>;
  addArticle: (data: Partial<Article>) => Promise<void>;
  updateArticle: (id: string, data: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  fetchArticleById: (id: string) => Promise<void>;
};

export const useArticleStore = create<ArticleState>((set, get) => ({
  articles: [],
  selectedArticle: null,
  loading: false,
  error: null,

  fetchArticles: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/article`);
      const data = await res.json();
      set({ articles: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

   fetchArticleById: async (id: string) => {
    try {
      set({ loading: true, selectedArticle: null });
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/article/${id}`);
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || 'Failed to fetch article');

      set({ selectedArticle: result.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addArticle: async (data) => {
    await fetchWithAuth(`${import.meta.env.VITE_API_URL}/article/create`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    await get().fetchArticles();
  },

  updateArticle: async (id, data) => {
    await fetchWithAuth(`${import.meta.env.VITE_API_URL}/article/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    await get().fetchArticles();
  },

  deleteArticle: async (id) => {
    await fetchWithAuth(`${import.meta.env.VITE_API_URL}/article/${id}`, {
      method: 'DELETE',
    });
    await get().fetchArticles();
  },
}));
