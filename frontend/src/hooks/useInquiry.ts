import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Inquiry, CreateInquiryData, UpdateInquiryStatusData, APIResponse } from "../types/types";
import { showSuccessMessage, showErrorMessage } from "../lib/message";
import { dashboardKeys } from "./useDashboard";

export const inquiryKeys = {
  all: ["inquiries"] as const,
  lists: () => [...inquiryKeys.all, "list"] as const,
  detail: (id: string) => [...inquiryKeys.all, "detail", id] as const,
};

export function useInquiries() {
  return useQuery({
    queryKey: inquiryKeys.lists(),
    queryFn: async (): Promise<Inquiry[]> => {
      const response = await api.get<any, APIResponse<Inquiry[]>>("/inquiries");
      return response.data;
    },
  });
}

export function useCreateInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateInquiryData) => {
      const response = await api.post<any, APIResponse<Inquiry>>("/inquiries", data);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: inquiryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      showSuccessMessage(response.message);
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
}

export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateInquiryStatusData }) => {
      const response = await api.put<any, APIResponse<Inquiry>>(`/inquiries/${id}/status`, data);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: inquiryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      showSuccessMessage(response.message);
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
}
