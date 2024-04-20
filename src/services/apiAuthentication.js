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
    console.log("Response from axios : ", response);
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

export async function logout() {
  try {
    const response = await axiosPrivate.post(`/authenticate/logout`, {});
    console.log("Response from axios : ", response);
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
