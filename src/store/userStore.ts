import { create } from 'zustand';
import { fetchWithAuth } from '@/utils/fetchWithAuth';

export interface User {
  id: string;
  email: string;
  userName: string | null;
  role: string;
  status: string;
  createdAt: string;
  hasActiveSubscription: boolean;
  latestPaymentDate: string | null;
  paymentDurationDays: number | null;
  totalPayments: number;
}


type UserState = {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  createAdmin: (email: string, password: string) => Promise<void>;
};

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/user`);
      const data = await res.json();
      set({ users: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createAdmin: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/user/admin/create`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Failed to create admin');
      }

      await get().fetchUsers(); 
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  }
}));
