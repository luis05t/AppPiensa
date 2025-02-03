import api from "./api";

export const http = {
  get: <T>(url: string) => api.get<T>(url).then((response) => response.data),
  post: <T>(url: string, data: any, options?: any) =>
    api.post<T>(url, data, options).then((response) => response.data),
  patch: <T>(url: string, data: any) =>
    api.patch<T>(url, data).then((response) => response.data),
  delete: <T>(url: string) =>
    api.delete<T>(url).then((response) => response.data),
};
