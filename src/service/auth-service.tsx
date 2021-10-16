import axios from "axios";
import { API_AUTH_URL } from "../utils/consts";
import { AuthResponseType } from "../utils/types/services";
import { messagesTemplate } from "../utils/messageTemplate";
import { routes } from "../constants/routes";
const initialResponse: AuthResponseType = {
  ok: false,
  status: 0,
  message: "",
  data: null,
};

const axiosInstance = axios.create({
  baseURL: API_AUTH_URL,
});

export const postAuth = async (
  rute: string,
  body: any,
  headers: any = null
) => {
  let config;
  if (headers) {
    config = {
      headers,
    };
  }
  try {
    const response = await axiosInstance.post(rute, body, config);
    initialResponse.status = response.status;
    initialResponse.ok = true;
    initialResponse.message = messagesTemplate.SUCCESS;
    if (response.data) {
      initialResponse.data = response.data.data;
    }
  } catch (err: any) {
    if (err.response) {
      initialResponse.status = err.response.status;
    }
    initialResponse.ok = false;
    initialResponse.message = err;
  }
  return initialResponse;
};

export const getAuth = async (rute: string, headers: any = null) => {
  let config;
  if (headers) {
    config = {
      headers,
    };
  }
  try {
    const response = await axiosInstance.get(rute, config);
    initialResponse.status = response.status;
    initialResponse.ok = true;
    initialResponse.message = messagesTemplate.SUCCESS;
    if (response.data) {
      initialResponse.data = response.data;
    }
  } catch (error: any) {
    if (error.response) {
      initialResponse.status = error.response.status;
    }
    initialResponse.ok = false;
    initialResponse.message = error;
  }
  return initialResponse;
};

export const refreshTokenService = async (refreshToken: string) => {
  try {
    const response = await axiosInstance.post(routes.REFRESH_TOKEN, {
      refreshToken,
    });
    initialResponse.status = response.status;
    initialResponse.ok = true;
    initialResponse.message = messagesTemplate.SUCCESS;
    if (response.data) {
      initialResponse.data = response.data.data;
    }
  } catch (err: any) {
    if (err.response) {
      initialResponse.status = err.response.status;
    }
    initialResponse.ok = false;
    initialResponse.message = err;
  }
  return initialResponse;
};
