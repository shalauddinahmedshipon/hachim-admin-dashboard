import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from "jwt-decode"

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: JwtPayload | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });

        try {
           const apiUrl = import.meta.env.VITE_API_URL;
           const res = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const result = await res.json();

          if (!res.ok || !result.success) {
            set({ loading: false, error: result.message || 'Login failed' });
            return false;
          }

          const decoded = jwtDecode<JwtPayload>(result.data.access_token);

          if (decoded.role !== 'ADMIN') {
            set({ loading: false, error: 'Access denied: Not an admin' });
            return false;
          }

          set({
            accessToken: result.data.access_token,
            refreshToken: result.data.refresh_token,
            user: decoded,
            loading: false,
          });

          return true;
        } catch (err) {
          set({ loading: false, error: 'Something went wrong' });
          return false;
        }
      },

      logout: () => {
        set({ accessToken: null, refreshToken: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
