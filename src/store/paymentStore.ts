// store/paymentStore.ts
import { create } from 'zustand';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import type { User } from './userStore';

export interface Payment {
  id: string;
  amount: number;
  transactionId: string;
  durationDays: number;
  email: string;
  subscription: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User
}

type PaymentState = {
  payments: Payment[];
  total: number;
  loading: boolean;
  error: string | null;
  fetchPayments: (amount?: string) => Promise<void>;
};

export const usePaymentStore = create<PaymentState>((set) => ({
  payments: [],
  total: 0,
  loading: false,
  error: null,

  fetchPayments: async (amount) => {
    set({ loading: true, error: null });
    try {
      const query = amount ? `?amount=${amount}` : '';
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/payments${query}`);
      const json = await res.json();

      set({
        payments: json.data,
        total: json.total,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
