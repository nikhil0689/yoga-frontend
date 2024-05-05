import { useQuery } from "@tanstack/react-query";
import { getMonthlyClassesStats } from "../../services/apiDashboard";

export function useDashboardMonthlyClassesStats() {
  const {
    data: dashboardMonthlyClassesStats,
    isLoading: isMonthlyClassesStatsLoading,
    error,
  } = useQuery({
    queryKey: ["monthlyClassesStats"],
    queryFn: () => getMonthlyClassesStats(),
    retry: 2,
  });

  return { isMonthlyClassesStatsLoading, dashboardMonthlyClassesStats, error };
}
