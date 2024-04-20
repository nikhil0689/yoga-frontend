import { AxiosError } from "axios";

export async function getDashboardStats({ axiosPrivate }) {
  try {
    const fetchResponse = await axiosPrivate.get(`/dashboard/stats`);
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
