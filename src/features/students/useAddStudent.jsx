import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStudent as addStudentAPI } from "../../services/apiStudents";
import { useNavigate } from "react-router-dom";

export function useAddStudent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addStudent, isLoading } = useMutation({
    mutationFn: addStudentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      navigate("/students", { replace: true });
    },
    onError: (err) => {
      console.log("Student cannot be added", err);
    },
  });

  return { addStudent, isLoading };
}
