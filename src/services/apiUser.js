import { AxiosError } from "axios";
import { axiosPrivate } from "./axios";

export async function getSessionUser() {
  try {
    const fetchResponse = await axiosPrivate.get(`/users/me`);
    const { data } = fetchResponse;
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
