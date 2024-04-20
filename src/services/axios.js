import axios from "axios";
import { URL } from "../utils/constants";

export default axios.create({
  baseURL: URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
