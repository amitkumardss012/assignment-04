import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { APIResponse, AdminDashboardStats, VendorProfile, CreateVendorData } from "../types/types";
import { toast } from "sonner";

export const adminKeys = {
  all: ["admin"] as const,
  stats: () => [...adminKeys.all, "stats"] as const,
  vendors: () => [...adminKeys.all, "vendors"] as const,
  vendorDetail: (id: string) => [...adminKeys.vendors(), id] as const,
};

export function useAdminStats() {
  return useQuery({
    queryKey: adminKeys.stats(),
    queryFn: async (): Promise<AdminDashboardStats> => {
      const response = await api.get<any, APIResponse<AdminDashboardStats>>("/admin/stats");
      return response.data;
    },
  });
}

export function useAdminVendors() {
  return useQuery({
    queryKey: adminKeys.vendors(),
    queryFn: async (): Promise<VendorProfile[]> => {
      const response = await api.get<any, APIResponse<VendorProfile[]>>("/admin/vendors");
      return response.data;
    },
  });
}

export function useAdminVendorDetails(vendorId: string) {
  return useQuery({
    queryKey: adminKeys.vendorDetail(vendorId),
    queryFn: async (): Promise<VendorProfile> => {
      const response = await api.get<any, APIResponse<VendorProfile>>(`/admin/vendors/${vendorId}`);
      return response.data;
    },
    enabled: !!vendorId,
  });
}

export function useCreateVendor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateVendorData & { email: string; password: string }) => {
      const response = await api.post<any, APIResponse<VendorProfile>>("/admin/vendors", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.vendors() });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
      toast.success("Vendor created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create vendor");
    },
  });
}
