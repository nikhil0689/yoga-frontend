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

const MonthlyClassesData = ({ monthlyStats }) => {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        month: { stroke: "#4f46e5", fill: "#4f46e5" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        month: { stroke: "#4f46e5", fill: "#c7d2fe" },
        text: "#374151",
        background: "#fff",
      };

  const formatTooltip = (value) => {
    const data = value > 1 ? "Classes" : "Class";
    return [`${value} ${data}`]; // Format tooltip content as desired
  };

  const maxClasses = Math.max(...monthlyStats.map((entry) => entry.classes));

  return (
    <StyledMonthlyClassTable>
      <Row type="horizontal">
        <Heading as="h2">Classes</Heading>
      </Row>
      <br />
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={monthlyStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            domain={[0, maxClasses]} // Set the domain of Y-axis
            tickCount={5} // Adjust the number of ticks
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            interval="preserveStartEnd"
          />
          <Legend />
          <Tooltip
            contentStyle={{ backgroundColor: colors.background }}
            formatter={formatTooltip}
          />
          <Bar dataKey="classes" fill="var(--color-brand-700)" />
        </BarChart>
      </ResponsiveContainer>
    </StyledMonthlyClassTable>
  );
};

export default MonthlyClassesData;
