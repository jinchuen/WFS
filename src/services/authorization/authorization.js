// api/authorization.js
import { ChevronsLeft } from "lucide-react";
import api from "../api";

const AUTHORIZATION_URL = "/authorization";

export const getAuthorization = {
  login: async (data) => {
    const response = await api.post(`${AUTHORIZATION_URL}/login`, data);
    if (response.data.result === "success") {
      return response.data.data; // { accessToken, user }
    } else {
      throw new Error(response.data.message);
    }
  },
  logout: async (data) => {
    const response = await api.post(`${AUTHORIZATION_URL}/logout`)
    if (response.data.result === "success") {
      return response.data.data; // { accessToken, user }
    } else {
      throw new Error(response.data.message);
    }
  }
};
