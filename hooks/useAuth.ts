import { useAuthStore } from "@/services/auth.store";

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    loadUser,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    authLoading: isLoading,
    authError: error,
    login,
    logout,
    register,
    loadUser,
  };
};
