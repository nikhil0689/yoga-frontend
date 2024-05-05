import { AxiosError } from "axios";
import { PAGE_SIZE } from "../utils/constants";
import { axiosPrivate } from "./axios";

export async function getStudents({ page = 1 }) {
  try {
    const fetchResponse = await axiosPrivate.get(
      `/students?page=${page}&size=${PAGE_SIZE}`
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

export async function getStudentsCount() {
  try {
    const fetchResponse = await axiosPrivate.get(`/students/count`);
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

export async function getStudent(studentId) {
  try {
    const fetchResponse = await axiosPrivate.get(`/students/${studentId}`);
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

export async function getFamilies() {
  try {
    const fetchResponse = await axiosPrivate.get(`/families`);
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

export async function addStudent(newStudent) {
  try {
    const response = await axiosPrivate.post(
      "/students",
      JSON.stringify(newStudent),
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

export async function editStudent({ newStudent, studentId }) {
  try {
    const response = await axiosPrivate.patch(
      `/students/${studentId}`,
      JSON.stringify(newStudent),
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
