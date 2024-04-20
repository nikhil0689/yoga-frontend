import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPayment } from "../../services/apiPayments";

export function usePayment() {
  const { paymentId } = useParams();
  const {
    data: payment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payments", paymentId],
    queryFn: () => getPayment(paymentId),
    retry: false,
  });

  return { isLoading, payment, error };
}
