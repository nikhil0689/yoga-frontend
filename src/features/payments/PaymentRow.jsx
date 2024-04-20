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

export default function PaymentRow({
  payment: { id: paymentId, student, payment: amount, date },
}) {
  const studentName = student.props.name;
  const navigate = useNavigate();
  return (
    <Table.Row>
      <DataItem>{paymentId}</DataItem>
      <DataItem>{studentName}</DataItem>
      <DataItem>{formatCurrency(amount)}</DataItem>
      <DataItem>{format(new Date(date), "EEEE, MMM dd yyyy")}</DataItem>

      <ButtonIcon onClick={() => navigate(`/payments/${paymentId}`)}>
        <EditIcon />
      </ButtonIcon>
    </Table.Row>
  );
}
