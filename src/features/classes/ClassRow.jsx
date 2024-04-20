/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../ui/ButtonIcon";
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

const Email = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
  font-family: "Open Sans", sans-serif;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

export default function ClassRow({
  classData: { classId, date, time, students },
}) {
  const navigate = useNavigate();
  const dateTime = new Date(time);
  return (
    <Table.Row>
      <DataItem>{classId}</DataItem>
      <DataItem>{format(new Date(date), "EEEE, MMM dd yyyy")}</DataItem>
      <Email>
        {dateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Email>
      <Stacked>
        {students.map((student, index) => (
          <DataItem key={index}>{student.studentName}</DataItem>
        ))}
      </Stacked>
      <Stacked>
        {students.map((student, index) => (
          <DataItem key={index}>{formatCurrency(student.fee)}</DataItem>
        ))}
      </Stacked>

      <ButtonIcon onClick={() => navigate(`/classes/${classId}`)}>
        <EditIcon />
      </ButtonIcon>
    </Table.Row>
  );
}
