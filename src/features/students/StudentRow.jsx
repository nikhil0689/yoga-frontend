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

export default function StudentRow({
  student: { id: studentId, name, classCount, phone, address, family },
}) {
  const navigate = useNavigate();
  return (
    <Table.Row>
      <DataItem>{name}</DataItem>
      <DataItem>{classCount}</DataItem>
      <DataItem>{phone}</DataItem>
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
