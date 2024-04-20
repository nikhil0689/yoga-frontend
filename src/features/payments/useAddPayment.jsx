import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addPayment as addPaymentAPI } from "../../services/apiPayments";

export function useAddPayment() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addPayment, isLoading } = useMutation({
    mutationFn: addPaymentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
      navigate("/payments", { replace: true });
    },
    onError: (err) => {
      console.log("Payment cannot be added", err);
    },
  });

  return { addPayment, isLoading };
}
