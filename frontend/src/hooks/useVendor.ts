import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { VendorProfile, CreateVendorData, UpdateVendorData, APIResponse } from "../types/types";
import { showSuccessMessage, showErrorMessage } from "../lib/message";

export const vendorKeys = {
  all: ["vendor"] as const,
  profile: () => [...vendorKeys.all, "profile"] as const,
};

export function useVendorProfile() {
  return useQuery({
    queryKey: vendorKeys.profile(),
    queryFn: async (): Promise<VendorProfile> => {
      const response = await api.get<any, APIResponse<VendorProfile>>("/vendor/profile");
      return response.data;
    },
    retry: false,
  });
}

export function useCreateVendorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateVendorData) => {
      const response = await api.post<any, APIResponse<VendorProfile>>("/vendor/profile", data);
      return response;
    },
    onSuccess: (response) => {
      queryClient.setQueryData(vendorKeys.profile(), response.data);
      showSuccessMessage(response.message);
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
}

export function useUpdateVendorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateVendorData) => {
      const response = await api.put<any, APIResponse<VendorProfile>>("/vendor/profile", data);
      return response;
    },
    onSuccess: (response) => {
      queryClient.setQueryData(vendorKeys.profile(), response.data);
      showSuccessMessage(response.message);
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
}
