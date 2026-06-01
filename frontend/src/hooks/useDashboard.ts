import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { DashboardStats, Inquiry, ActivityLog, APIResponse } from "../types/types";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  upcoming: () => [...dashboardKeys.all, "upcoming"] as const,
  recentActivity: () => [...dashboardKeys.all, "recentActivity"] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: async (): Promise<DashboardStats> => {
      const response = await api.get<any, APIResponse<DashboardStats>>("/dashboard/stats");
      return response.data;
    },
  });
}

export function useUpcomingEvents() {
  return useQuery({
    queryKey: dashboardKeys.upcoming(),
    queryFn: async (): Promise<Inquiry[]> => {
      const response = await api.get<any, APIResponse<Inquiry[]>>("/dashboard/upcoming-events");
      return response.data;
    },
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: dashboardKeys.recentActivity(),
    queryFn: async (): Promise<ActivityLog[]> => {
      const response = await api.get<any, APIResponse<ActivityLog[]>>("/dashboard/recent-activity");
      return response.data;
    },
  });
}
