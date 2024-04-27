import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuthentication";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export function useLogin() {
  const { setAccessToken, setSessionUser } = useAuth();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ userId, password }) => loginApi({ id: userId, password }),
    onSuccess: (data) => {
      const { accessToken, user } = data;
      setAccessToken(accessToken);
      setSessionUser(user.props);
      navigate("/home", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(`Unable to Log in at this time. ${err}`);
    },
  });

  return { login, isLoading };
}
