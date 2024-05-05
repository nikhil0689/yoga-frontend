import styled from "styled-components";

import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import { useDashboardStats } from "./useDashboardStats";
import Empty from "../../ui/Empty";
import StudentBalanceList from "./StudentBalanceList";
import { useDashboardMonthlyClassesStats } from "./useDashboardMonthlyClassesStats";
import MonthlyClassesData from "./MonthlyClassesData";
import { useDashboardMonthlyPaymentsStats } from "./useDashboardMonthlyPaymentsStats";
import MonthlyPaymentsData from "./MonthlyPaymentsData";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 2.4rem;
`;

const StyledDashboardLayout1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isDashboardStatsLoading, dashboardStats, error } =
    useDashboardStats();

  const {
    isMonthlyClassesStatsLoading,
    dashboardMonthlyClassesStats: monthlyStats,
    error: monthlyStatsError,
  } = useDashboardMonthlyClassesStats();

  const {
    isMonthlyPaymentsStatsLoading,
    dashboardMonthlyPaymentsStats,
    error: monthlyPaymentsError,
  } = useDashboardMonthlyPaymentsStats();

  if (
    isDashboardStatsLoading ||
    isMonthlyPaymentsStatsLoading ||
    isMonthlyClassesStatsLoading
  ) {
    return <Spinner />;
  }

  if (!dashboardStats) {
    return <Empty resourceName="dashboard" />;
  }

  if (error || monthlyStatsError || monthlyPaymentsError) {
    console.log("error message: ", error);
  }

  const { data } = monthlyStats;
  const { data: paymentStats } = dashboardMonthlyPaymentsStats;
  return (
    <>
      <StyledDashboardLayout>
        <Stats dashboardStats={dashboardStats} />
      </StyledDashboardLayout>
      <StyledDashboardLayout1>
        <StudentBalanceList />
        <MonthlyClassesData monthlyStats={data} />
      </StyledDashboardLayout1>
      <MonthlyPaymentsData monthlyPaymentStats={paymentStats} />
    </>
  );
}
