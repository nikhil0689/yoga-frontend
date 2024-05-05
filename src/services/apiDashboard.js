import { AxiosError } from "axios";
import { axiosPrivate } from "./axios";

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

export async function getMonthlyClassesStats() {
  try {
    const year = 2024;
    const fetchResponse = await axiosPrivate.get(`/dashboard/classes/${year}`);
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

export async function getMonthlyPaymentsStats() {
  try {
    const year = 2024;
    const fetchResponse = await axiosPrivate.get(`/dashboard/payments/${year}`);
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
