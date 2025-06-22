// src/utils/fetchWithAuth.ts
import { useAuthStore } from "@/store/useAuthStore";

export const fetchWithAuth = async (input: RequestInfo, init: RequestInit = {}) => {
  const { accessToken, refreshToken, logout, setTokens } = useAuthStore.getState();

  const apiUrl = import.meta.env.VITE_API_URL;

  const authInit = {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  let response = await fetch(input, authInit);

  // If unauthorized, try refreshing the access token
  if (response.status === 401 && refreshToken) {
    try {
      const refreshResponse = await fetch(`${apiUrl}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      const result = await refreshResponse.json();

      if (!refreshResponse.ok || !result.success) {
        logout();
        throw new Error("Refresh token failed");
      }

      const newAccessToken = result.data.access_token;
      const newRefreshToken = result.data.refresh_token;

      setTokens(newAccessToken, newRefreshToken);

      // Retry original request with new token
      const retryInit = {
        ...init,
        headers: {
          ...(init.headers || {}),
          Authorization: `Bearer ${newAccessToken}`,
          "Content-Type": "application/json",
        },
      };

      response = await fetch(input, retryInit);
    } catch (err) {
      logout();
      throw new Error("Token refresh failed");
    }
  }

  return response;
};
