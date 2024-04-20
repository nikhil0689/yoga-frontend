import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudents } from "../../services/apiStudents";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useStudents() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: students, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students", page],
    queryFn: () => getStudents({ page }),
    retry: 2,
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["students", page + 1],
      queryFn: () => getStudents({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["students", page - 1],
      queryFn: () => getStudents({ page: page - 1 }),
    });

  return { isLoading, students, error, count };
}
