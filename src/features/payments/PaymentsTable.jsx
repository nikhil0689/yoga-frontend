import toast from "react-hot-toast";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";

import Table from "../../ui/Table";
import { usePayments } from "./usePayments";
import PaymentRow from "./PaymentRow";
import Pagination from "../../ui/Pagination";

export default function PaymentsTable() {
  const { payments, isLoading, error, count } = usePayments();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    toast.error(error.message);
    console.log("error in students page: ", error);
  }

  if (!payments || payments.length === 0) {
    return <Empty resourceName="Payments" />;
  }

  return (
    <>
      <Table columns="2fr 2fr 2fr 2fr 4rem">
        <Table.Header>
          <div>Payment Id</div>
          <div>Student</div>
          <div>Amount</div>
          <div>Date</div>
        </Table.Header>

        <Table.Body
          data={payments}
          render={(payment) => (
            <PaymentRow key={payment.id} payment={payment} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </>
  );
}
