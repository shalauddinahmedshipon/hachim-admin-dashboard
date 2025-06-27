import { create } from 'zustand';
import { fetchWithAuth } from '@/utils/fetchWithAuth';

export type AnimationImage = {
  id: string;
  imageUrl: string | null;
  cloudinaryPublicId: string | null;
  createdAt: string;
  updatedAt: string;
};

type AnimationImageState = {
  animationImages: AnimationImage[];
  selectedImage: AnimationImage | null;
  loading: boolean;
  error: string | null;
  fetchAnimationImages: () => Promise<void>;
  fetchAnimationImageById: (id: string) => Promise<void>;
  addAnimationImage: (data: FormData) => Promise<void>;
  updateAnimationImage: (id: string, data: FormData) => Promise<void>;
  deleteAnimationImage: (id: string) => Promise<void>;
};

export const useAnimationImageStore = create<AnimationImageState>((set, get) => ({
  animationImages: [],
  selectedImage: null,
  loading: false,
  error: null,

  fetchAnimationImages: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/animation-image`);
      const data = await res.json();
      set({ animationImages: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchAnimationImageById: async (id) => {
    set({ loading: true });
    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/animation-image/${id}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      set({ selectedImage: result.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addAnimationImage: async (formData) => {
    await fetchWithAuth(`${import.meta.env.VITE_API_URL}/animation-image/create`, {
      method: 'POST',
      body: formData,
    });
    await get().fetchAnimationImages();
  },

  updateAnimationImage: async (id, formData) => {
    await fetchWithAuth(`${import.meta.env.VITE_API_URL}/animation-image/${id}`, {
      method: 'PATCH',
      body: formData,
    });
    await get().fetchAnimationImages();
  },

  deleteAnimationImage: async (id) => {
    await fetchWithAuth(`${import.meta.env.VITE_API_URL}/animation-image/${id}`, {
      method: 'DELETE',
    });
    await get().fetchAnimationImages();
  },
}));
