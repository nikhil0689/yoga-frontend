import { AxiosError } from "axios";
import { PAGE_SIZE } from "../utils/constants";
import { axiosPrivate } from "./axios";

export async function getClasses({ page = 1 }) {
  try {
    const fetchResponse = await axiosPrivate.get(
      `/classes/?page=${page}&size=${PAGE_SIZE}`
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

export async function getClass(classId) {
  try {
    const fetchResponse = await axiosPrivate.get(`/classes/${classId}`);
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

export async function getClassesCount() {
  try {
    const fetchResponse = await axiosPrivate.get(`/classes/count`);
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

export async function addClass(classDetails) {
  try {
    const response = await axiosPrivate.post(
      "/classes",
      JSON.stringify(classDetails)
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

export async function editClass({ classDetails, classId }) {
  try {
    const response = await axiosPrivate.patch(
      `/classes/${classId}`,
      JSON.stringify(classDetails)
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

export async function deleteClass(classId) {
  try {
    const response = await axiosPrivate.delete(`/classes/${classId}`, {});
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
