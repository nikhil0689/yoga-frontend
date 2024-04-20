import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getClasses } from "../../services/apiClasses";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useClasses() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: classes, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes", page],
    queryFn: () => getClasses({ page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["classes", page + 1],
      queryFn: () => getClasses({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["classes", page - 1],
      queryFn: () => getClasses({ page: page - 1 }),
    });

  return { classes, isLoading, error, count };
}
