/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";
import { format } from "date-fns";
import { formatCurrency } from "../../utils/helpers";

const DataItem = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
  font-family: "Open Sans", sans-serif;
  &::first-letter {
    text-transform: uppercase;
  }
`;

export default function StudentClassRow({
  studentClassData: { classId, fee, _class },
}) {
  const date = _class.props.date;
  const time = _class.props.time;
  const dateTime = new Date(time);
  return (
    <Table.Row>
      <DataItem>{classId}</DataItem>
      <DataItem>{format(new Date(date), "EEEE, MMM dd yyyy")}</DataItem>
      <DataItem>
        {dateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </DataItem>
      <DataItem>{formatCurrency(fee)}</DataItem>
    </Table.Row>
  );
}
