import { create } from 'zustand';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import { toast } from 'sonner';

export interface Subscription {
  id: string;
  userId: string;
  amount: number;
  durationDays: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

type SubscriptionState = {
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
  fetchSubscriptions: () => Promise<void>;
  createSubscription: (payload: { amount: number; durationDays: number }) => Promise<void>;
  toggleActive: (id: string, current: boolean) => Promise<void>;
  deleteSubscription: (id: string) => Promise<void>;
};

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscriptions: [],
  loading: false,
  error: null,

  fetchSubscriptions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/subscriptions/all`);
      const data = await res.json();
      set({ subscriptions: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
      toast.error('Failed to fetch subscriptions');
    }
  },

  createSubscription: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/subscriptions`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || 'Failed to create subscription');
      }

      toast.success(json.message || 'Subscription created');
      await get().fetchSubscriptions();
    } catch (err: any) {
      set({ error: err.message });
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  toggleActive: async (id, current) => {
    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/subscriptions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !current }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Failed to update subscription status');
      }

      toast.success('Subscription status updated');
      await get().fetchSubscriptions();
    } catch (err: any) {
      toast.error(err.message);
    }
  },

  deleteSubscription: async (id) => {
    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/subscriptions/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Failed to delete subscription');
      }

      toast.success('Subscription deleted');
      await get().fetchSubscriptions();
    } catch (err: any) {
      toast.error(err.message);
    }
  },
}));
