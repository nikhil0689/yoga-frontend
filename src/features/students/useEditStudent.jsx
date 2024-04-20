import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editStudent as editStudentAPI } from "../../services/apiStudents";
import { useNavigate } from "react-router-dom";

export function useEditStudent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: editStudent, isLoading: isEditing } = useMutation({
    mutationFn: editStudentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      navigate("/students", { replace: true });
    },
    onError: (err) => {
      console.log("Error from service", err);
    },
  });

  return { editStudent, isEditing };
}
