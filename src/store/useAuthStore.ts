import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from "jwt-decode";
import { toast } from 'sonner';

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
  setTokens: (access: string, refresh: string) => void;
  refreshAccessToken: () => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string, confirmPassword: string) => Promise<boolean>;
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
console.log(decoded)
console.log("Login result:", result);

    if (decoded.role !== 'ADMIN' && decoded.role !== 'SUPER_ADMIN') {
      set({ loading: false, error: 'Access denied: Not an admin or super admin' });
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


      setTokens: (access, refresh) => {
        const decoded = jwtDecode<JwtPayload>(access);
        set({ accessToken: access, refreshToken: refresh, user: decoded });
      },

      refreshAccessToken: async () => {
        const { refreshToken, logout } = useAuthStore.getState();
        const apiUrl = import.meta.env.VITE_API_URL;

        if (!refreshToken) return;

        try {
          const res = await fetch(`${apiUrl}/auth/refresh-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });

          const result = await res.json();

          if (!res.ok || !result.success) {
            logout();
            throw new Error("Failed to refresh access token");
          }

          const { access_token, refresh_token } = result.data;
          useAuthStore.getState().setTokens(access_token, refresh_token);
        } catch (err) {
          logout();
          throw err;
        }
      },

      logout: () => {
        set({ accessToken: null, refreshToken: null, user: null });
      },

      // New changePassword function
   changePassword: async (oldPassword, newPassword, confirmPassword) => {
  set({ loading: true, error: null });

  if (newPassword !== confirmPassword) {
    set({ loading: false, error: 'New password and confirm password do not match.' });
    toast.error('New password and confirmation do not match.');
    return false;
  }

  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const res = await fetch(`${apiUrl}/auth/change-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useAuthStore.getState().accessToken}`,
      },
      body: JSON.stringify({ oldPassword, newPassword,confirmPassword }),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      const errorMessage = result.message || 'Password change failed';
      set({ loading: false, error: errorMessage });
      toast.error(errorMessage);
      return false;
    }

    set({ loading: false, error: null });
    toast.success('Password changed successfully. Logging out...');

    // ⏳ Delay logout to allow toast to display
    setTimeout(() => {
      useAuthStore.getState().logout();
    }, 1500); // 1.5 seconds delay

    return true;
  } catch (err) {
    set({ loading: false, error: 'Something went wrong' });
    toast.error('Something went wrong');
    return false;
  }
},

    }),
    {
      name: 'auth-storage',
    }
  )
);
