import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addClass as addClassAPI } from "../../services/apiClasses";

export function useAddClass() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addClass, isLoading } = useMutation({
    mutationFn: addClassAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
      navigate("/classes", { replace: true });
    },
    onError: (err) => {
      console.log("Class cannot be added", err);
    },
  });

  return { addClass, isLoading };
}
