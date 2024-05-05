import { AxiosError } from "axios";
import { PAGE_SIZE } from "../utils/constants";
import { axiosPrivate } from "./axios";

export async function getPayments({ page = 1 }) {
  try {
    const fetchResponse = await axiosPrivate.get(
      `/payments?page=${page}&size=${PAGE_SIZE}`
    );
    const { data, status } = fetchResponse;

    if (status !== 200) {
      throw new Error();
    }

    const { results, count } = data;
    return { data: results, count };
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

export async function getPayment(paymentId) {
  try {
    const fetchResponse = await axiosPrivate.get(`/payments/${paymentId}`);
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

export async function addPayment(newPayment) {
  try {
    const response = await axiosPrivate.post(
      `/payments`,
      JSON.stringify(newPayment),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const { data } = response;
    const { accessToken } = data;
    return accessToken;
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

export async function editPayment({ editedPayment, paymentId }) {
  try {
    const response = await axiosPrivate.patch(
      `/payments/${paymentId}`,
      JSON.stringify(editedPayment),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const { data } = response;
    const { accessToken } = data;
    return accessToken;
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

export async function deletePayment(paymentId) {
  try {
    const response = await axiosPrivate.delete(`/payments/${paymentId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const { data } = response;
    const { accessToken } = data;
    return accessToken;
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
