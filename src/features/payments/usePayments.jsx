import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPayments } from "../../services/apiPayments";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function usePayments() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: payments, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payments", page],
    queryFn: () => getPayments({ page }),
    retry: 2,
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["payments", page + 1],
      queryFn: () => getPayments({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["payments", page - 1],
      queryFn: () => getPayments({ page: page - 1 }),
    });

  return { isLoading, payments, error, count };
}
