import axios from "axios";
import {useAuthStore} from './apiStoreZustand';

export const axiosApiLogin = axios.create({
  baseURL: "http://localhost:8009/app",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
export const axiosApi = axios.create({
    baseURL: "http://localhost:8009/app",
    withCredentials: true,
    headers: { 
      "Content-Type": "application/json",
      token: useAuthStore.getState().token
    },
});
