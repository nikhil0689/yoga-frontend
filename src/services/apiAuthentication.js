import { AxiosError } from "axios";
import axios, { axiosPrivate } from "./axios";

export async function login(loginCreds) {
  try {
    const response = await axios.post(
      "/authenticate/login",
      JSON.stringify(loginCreds),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const { data } = response;
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const { response, message } = err;
      if (!response) {
        throw new Error(message);
      }
      const { data } = response;
      throw new Error(data.message);
    } else {
      throw new Error(err.message);
    }
  }
}

export async function logout() {
  try {
    const response = await axiosPrivate.post(`/authenticate/logout`, {});
    const { data } = response;
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const { response, message } = err;
      if (!response) {
        throw new Error(message);
      }
      const { data, status } = response;
      throw new Error(data.message, status);
    } else {
      throw new Error(err.message, err.statusCode);
    }
  }
}
