import { useQuery } from "@tanstack/react-query";
import { getAllStudents } from "../../services/apiStudents";

export function useAllStudents() {
  const {
    data: { data: allStudents, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allStudents"],
    queryFn: () => getAllStudents(),
    retry: 2,
  });

  return { isLoading, allStudents, error, count };
}
