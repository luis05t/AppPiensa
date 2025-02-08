import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { secureStorage } from "./SecureStore/secureStoreService";
import {
  AuthLoginResponse,
  AuthRegisterResponse,
} from "@/interfaces/AuthResponse";
import { http } from "./http";
import { AuthState } from "@/interfaces/AuthState";
import { JwtPayload } from "@/interfaces/User";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await http.post<AuthLoginResponse>(
            "/auth/login",
            credentials
          );

          const { accessToken, ...userData } = response;

          await secureStorage.setToken(accessToken);

          set({
            user: { ...userData, accessToken },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Login failed",
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          await http.post<AuthRegisterResponse>("/auth/register", userData);
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Registration failed",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        await secureStorage.removeToken();
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      loadUser: async () => {
        set({ isLoading: true });
        try {
          const accessToken = await secureStorage.getToken();
          if (!accessToken) {
            set({ isLoading: false });
            return;
          }
          const decoded = jwtDecode<JwtPayload>(accessToken);

          if (decoded.exp * 1000 < Date.now()) {
            await get().logout();
            return;
          }

          set({
            user: {
              userId: decoded.id,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
              accessToken,
            },
            isAuthenticated: true,
          });
          console.log({
            user: {
              userId: decoded.id,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
              accessToken,
            },
            isAuthenticated: true,
          });
        } catch (error) {
          await get().logout();
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
