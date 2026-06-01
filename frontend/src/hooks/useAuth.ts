import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { User, RegisterData, LoginData, APIResponse } from "../types/types";
import { showSuccessMessage, showErrorMessage } from "../lib/message";

export const authKeys = {
  user: ["user"] as const,
};

export function useUser() {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: async (): Promise<User> => {
      const response = await api.get<any, APIResponse<User>>("/auth/me");
      return response.data;
    },
    retry: false,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await api.post<any, APIResponse<User>>("/auth/register", data);
      return response;
    },
    onSuccess: (response) => {
      showSuccessMessage(response.message);
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await api.post<any, APIResponse<{ user: User; token: string }>>("/auth/login", data);
      return response;
    },
    onSuccess: (response) => {
      queryClient.setQueryData(authKeys.user, response.data.user);
      showSuccessMessage(response.message);
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post<any, APIResponse<null>>("/auth/logout");
      return response;
    },
    onSuccess: (response) => {
      queryClient.setQueryData(authKeys.user, null);
      showSuccessMessage(response.message);
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
}
