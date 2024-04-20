import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { editClass as editClassAPI } from "../../services/apiClasses";

export function useEditClass() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: editClass, isLoading } = useMutation({
    mutationFn: editClassAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
      navigate("/classes", { replace: true });
    },
    onError: (err) => {
      console.log("Class cannot be edited", err);
    },
  });

  return { editClass, isLoading };
}
