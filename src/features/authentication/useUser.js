import { useQuery } from "@tanstack/react-query";
import { getSessionUser } from "../../services/apiUser";

export function useUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getSessionUser(),
    retry: false,
  });

  return { isLoading, user, error };
}
