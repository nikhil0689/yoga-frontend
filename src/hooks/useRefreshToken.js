import { useAuth } from "../context/AuthContext";
import axios from "../services/axios";

export default function useRefreshToken() {
  const { setAccessToken, setSessionUser, clearSessionData } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.post(
        "/authenticate/refresh",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          withCredentials: true,
        }
      );

      const { data } = response;
      const { accessToken, refreshToken, user } = data;
      localStorage.setItem("jwt", refreshToken);
      setAccessToken(accessToken);
      setSessionUser(user.props);

      return response.data.accessToken;
    } catch (error) {
      // Handle any errors that occur during token refresh
      clearSessionData();
      throw error; // Re-throw the error to propagate it to the caller
    }
  };

  return refresh;
}
