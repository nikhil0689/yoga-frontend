import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../../services/apiStudents";
import { useParams } from "react-router-dom";

export function useStudent() {
  const { studentId } = useParams();
  const {
    data: student,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students", studentId],
    queryFn: () => getStudent(studentId),
    retry: false,
  });

  return { isLoading, student, error };
}
