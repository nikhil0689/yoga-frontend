import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentClasses } from "../../services/apiClasses";
import { useParams, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useStudentClasses() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { studentId } = useParams();

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: studentClasses, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentClasses", page],
    queryFn: () => getStudentClasses(studentId, { page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["studentClasses", page + 1],
      queryFn: () => getStudentClasses(studentId, { page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["studentClasses", page - 1],
      queryFn: () => getStudentClasses(studentId, { page: page - 1 }),
    });

  queryClient.invalidateQueries({
    queryKey: ["studentClasses"],
  });

  return { studentClasses, isLoading, error, count };
}
