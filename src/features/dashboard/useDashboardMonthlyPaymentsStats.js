import { useQuery } from "@tanstack/react-query";
import { getMonthlyPaymentsStats } from "../../services/apiDashboard";

export function useDashboardMonthlyPaymentsStats() {
  const {
    data: dashboardMonthlyPaymentsStats,
    isLoading: isMonthlyPaymentsStatsLoading,
    error,
  } = useQuery({
    queryKey: ["monthlyPaymentsStats"],
    queryFn: () => getMonthlyPaymentsStats(),
    retry: 2,
  });

  return {
    isMonthlyPaymentsStatsLoading,
    dashboardMonthlyPaymentsStats,
    error,
  };
}
