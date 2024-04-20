import axios from "../../services/axios";

export default function useRefreshToken() {
  const refresh = async () => {
    const response = await axios.post("/authenticate/refresh", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("response: ", response);
    return response.data.accessToken;
  };
  return refresh;
}