import { create } from 'zustand';
import { fetchWithAuth } from '@/utils/fetchWithAuth';

export type Video = {
  id: string;
  title: string;
  videoUrl: string | null;
  cloudinaryPublicId: string | null;
  createdAt: string;
};

type VideoState = {
  videos: Video[];
  selectedVideo: Video | null;
  loading: boolean;
  error: string | null;
  fetchVideos: () => Promise<void>;
  addVideo: (data: FormData) => Promise<void>;
  updateVideo: (id: string, data: FormData) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  fetchVideoById: (id: string) => Promise<void>;
};

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  selectedVideo: null,
  loading: false,
  error: null,

  fetchVideos: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/video`);
      const data = await res.json();
      set({ videos: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchVideoById: async (id) => {
    try {
      set({ loading: true });
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/video/${id}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      set({ selectedVideo: result.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addVideo: async (formData) => {
    await fetchWithAuth(`${import.meta.env.VITE_API_URL}/video/create`, {
      method: 'POST',
      body: formData,
    });
    await get().fetchVideos();
  },

  updateVideo: async (id, formData) => {
    await fetchWithAuth(`${import.meta.env.VITE_API_URL}/video/${id}`, {
      method: 'PATCH',
      body: formData,
    });
    await get().fetchVideos();
  },

  deleteVideo: async (id) => {
    await fetchWithAuth(`${import.meta.env.VITE_API_URL}/video/${id}`, {
      method: 'DELETE',
    });
    await get().fetchVideos();
  },
}));
