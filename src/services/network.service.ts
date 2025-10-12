import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_PROXY as string;
console.log("some", BASE_URL);
// OR if you're using CRA: const BASE_URL = process.env.REACT_APP_BACKEND_PROXY as string;

const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// ✅ Auth Header Helper
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// ✅ GET
export const doGet = async <T = any>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  const config: AxiosRequestConfig = {
    headers: getAuthHeaders(),
    params,
  };
  const response: AxiosResponse<T> = await apiInstance.get(url, config);
  return response.data;
};

// ✅ POST
export const doPost = async <T = any>(
  url: string,
  data?: any,
  isMultipart = false
): Promise<T> => {
  const headers: Record<string, string> = getAuthHeaders();
  headers["Content-Type"] = isMultipart
    ? "multipart/form-data"
    : "application/json";

  const config: AxiosRequestConfig = { headers };
  const response: AxiosResponse<T> = await apiInstance.post(url, data, config);
  return response.data;
};

// ✅ PUT
export const doPut = async <T = any>(
  url: string,
  data?: any,
  isMultipart = false
): Promise<T> => {
  const headers: Record<string, string> = getAuthHeaders();
  headers["Content-Type"] = isMultipart
    ? "multipart/form-data"
    : "application/json";

  const config: AxiosRequestConfig = { headers };
  const response: AxiosResponse<T> = await apiInstance.put(url, data, config);
  return response.data;
};

// ✅ DELETE
export const doDelete = async <T = any>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  const config: AxiosRequestConfig = {
    headers: getAuthHeaders(),
    params,
  };
  const response: AxiosResponse<T> = await apiInstance.delete(url, config);
  return response.data;
};
