import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { editPayment as editPaymentAPI } from "../../services/apiPayments";

export function useEditPayment() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: editPayment, isLoading } = useMutation({
    mutationFn: editPaymentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
      navigate("/payments", { replace: true });
    },
    onError: (err) => {
      console.log("Payment cannot be edited", err);
    },
  });

  return { editPayment, isLoading };
}
