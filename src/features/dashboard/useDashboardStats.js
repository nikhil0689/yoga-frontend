import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../../services/apiDashboard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export function useDashboardStats() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: dashboardStats,
    isLoading: isDashboardStatsLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardStats({ axiosPrivate }),
    retry: 2,
  });

  return { isDashboardStatsLoading, dashboardStats, error };
}
