import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deletePayment as deletePaymentAPI } from "../../services/apiPayments";

export function useDeletePayment() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deletePayment } = useMutation({
    mutationFn: deletePaymentAPI,
    onSuccess: () => {
      toast.success("Payment deleted successfully ");

      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePayment };
}
