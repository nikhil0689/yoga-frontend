import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { axiosPrivate } from "../services/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const { token } = auth;

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("error in axios private 1");
        const prevRequest = error?.config;
        if (
          error?.response?.status === 401 ||
          (error?.response?.status === 403 && !prevRequest?.sent)
        ) {
          prevRequest.sent = true;
          console.log("using refresh token", error);
          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          } catch (error) {
            console.log("error in axios private");
          }
        }
        console.log("coming here in reject: ", error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
