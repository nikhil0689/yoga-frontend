import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import PaymentsTable from "../features/payments/PaymentsTable";

export default function Students() {
  const navigate = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Payments</Heading>
        <Button onClick={() => navigate("/payments/addPayment")}>
          Add Payment
        </Button>
      </Row>

      <Row>
        <PaymentsTable />
      </Row>
    </>
  );
}
