import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import { formatCurrency } from "../../utils/helpers";

const StyledMonthlyClassTable = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  width: 100%;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  padding-top: 2.4rem;
`;

const MonthlyPaymentsData = ({ monthlyPaymentStats }) => {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        month: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#e5e7eb",
        background: "#00050c",
      }
    : {
        month: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  const formatTooltip = (value) => {
    return [`${formatCurrency(value)}`]; // Format tooltip content as desired
  };

  const maxPayment = Math.max(
    ...monthlyPaymentStats.map((entry) => entry.payments)
  );

  return (
    <StyledMonthlyClassTable>
      <Row type="horizontal">
        <Heading as="h2">Payments</Heading>
      </Row>
      <br />
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={monthlyPaymentStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            domain={[0, maxPayment]} // Set the domain of Y-axis
            tickCount={10} // Adjust the number of ticks
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Legend />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              color: colors.text,
            }}
            formatter={formatTooltip}
          />
          <Bar dataKey="payments" fill="#127c39" />
        </BarChart>
      </ResponsiveContainer>
    </StyledMonthlyClassTable>
  );
};

export default MonthlyPaymentsData;
