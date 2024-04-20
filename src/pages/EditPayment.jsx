import EditPaymentForm from "../features/payments/EditPaymentForm";
import Heading from "../ui/Heading";

export default function EditPayment() {
  return (
    <>
      <Heading as="h1">Edit Payment Details</Heading>
      <EditPaymentForm />
    </>
  );
}
