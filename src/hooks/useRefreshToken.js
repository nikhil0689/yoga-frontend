import { useAuth } from "../context/AuthContext";
import axios from "../services/axios";

export default function useRefreshToken() {
  const { setAccessToken, setSessionUser } = useAuth();

  const refresh = async () => {
    const response = await axios.post("/authenticate/refresh", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const { data } = response;
    const { accessToken, user } = data;
    setAccessToken(accessToken);
    setSessionUser(user.props);
    return response.data.accessToken;
  };
  return refresh;
}
