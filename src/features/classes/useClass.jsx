import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getClass } from "../../services/apiClasses";

export function useClass() {
  const { classId } = useParams();
  const {
    data: classDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes", classId],
    queryFn: () => getClass(classId),
    retry: false,
  });

  return { isLoading, classDetails, error };
}
