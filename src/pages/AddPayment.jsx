import AddPaymentForm from "../features/payments/AddPaymentForm";
import Heading from "../ui/Heading";

export default function AddPayment() {
  return (
    <>
      <Heading as="h1">Add a Payment</Heading>
      <AddPaymentForm />
    </>
  );
}
