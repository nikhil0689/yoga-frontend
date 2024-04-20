import { useQuery } from "@tanstack/react-query";
import { getFamilies } from "../../services/apiStudents";

export function useFamilies() {
  const {
    data: families,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["families"],
    queryFn: getFamilies,
  });

  return { isLoading, families, error };
}
