import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutAPI } from "../../services/apiAuthentication";
import { useAuth } from "../../context/AuthContext";

export function useLogout() {
  const { clearSessionData } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutAPI(),
    onSuccess: () => {
      queryClient.removeQueries();
      clearSessionData();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
