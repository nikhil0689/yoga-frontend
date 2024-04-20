import styled from "styled-components";

import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import { useDashboardStats } from "./useDashboardStats";
import Empty from "../../ui/Empty";
import StudentBalanceList from "./StudentBalanceList";

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

  if (isDashboardStatsLoading) {
    return <Spinner />;
  }

  if (!dashboardStats) {
    return <Empty resourceName="dashboard" />;
  }

  if (error) {
    console.log("error message: ", error);
  }

  return (
    <>
      <StyledDashboardLayout>
        <Stats dashboardStats={dashboardStats} />
      </StyledDashboardLayout>
      <StyledDashboardLayout1>
        <StudentBalanceList />
      </StyledDashboardLayout1>
    </>
  );
}
