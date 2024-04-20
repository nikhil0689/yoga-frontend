/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../ui/ButtonIcon";

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

// const Stacked = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.2rem;

//   & span:first-child {
//     font-weight: 500;
//   }

//   & span:last-child {
//     color: var(--color-grey-500);
//     font-size: 1.2rem;
//   }
// `;

// const Amount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
// `;

export default function StudentRow({
  student: { id: studentId, name, email, phone, address, family },
}) {
  const navigate = useNavigate();
  return (
    <Table.Row>
      <DataItem>{name}</DataItem>
      <DataItem>{phone}</DataItem>
      <Email>{email}</Email>
      <DataItem>{address}</DataItem>
      <DataItem>
        {family.props.familyName}
        <span>&apos;s</span>
      </DataItem>
      <ButtonIcon onClick={() => navigate(`/students/${studentId}`)}>
        <EditIcon />
      </ButtonIcon>
    </Table.Row>
  );
}
