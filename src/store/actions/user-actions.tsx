import { showData } from "../slices/user-slice";
import {
  sendNotification,
  stopSpinner,
  startSpinner,
} from "../slices/ui-slice";
import { login, logout } from "../slices/auth";

import { getAuth } from "../../service/auth-service";

import {
  LS_AUTH_ACCESS_TOKEN,
  NOTIFICATION_ERROR,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_WARNING,
  TOKEN_TYPE,
} from "../../utils/consts";

import { routes } from "../../constants/routes";
import { createOrganizationService, createUserService } from "../../service";
import axios from "axios";
import { Content_Type_Value, HeaderType } from "../../utils/validators";

const { AUTHORIZATION, CONTENT_TYPE } = HeaderType;
const { APP_JSON } = Content_Type_Value;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LS_AUTH_ACCESS_TOKEN);
    if (token) {
      config.headers[AUTHORIZATION] = TOKEN_TYPE + token;
    }
    config.headers[CONTENT_TYPE] = APP_JSON;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const userInfoAction = (jwt: any) => {
  return async (dispatch: any) => {
    dispatch(startSpinner());
    const res = await getAuth(routes.USER_INFO, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    });
    if (res.ok) {
      const { email, name, surname } = res.data;
      dispatch(
        showData({
          email,
          name,
          surname,
        })
      );
    } else {
      dispatch(logout());
      window.location.replace(routes.LOG_IN);
      dispatch(
        sendNotification({
          type: NOTIFICATION_WARNING,
          message: "Expired token!",
        })
      );
    }
    dispatch(stopSpinner());
  };
};

export const createUserAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await createUserService(data);
    if (res.ok) {
      dispatch(
        sendNotification({
          type: NOTIFICATION_SUCCESS,
          message: "Successfully added the user",
        })
      );
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_ERROR,
          message: "User already exists in organization",
        })
      );
    }
    dispatch(stopSpinner());
  };
};

export const createOrganizationAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await createOrganizationService(data);
    if (res.ok) {
      let { access_token, refresh_token } = res.data;
      dispatch(
        login({
          accessToken: access_token,
          refreshToken: refresh_token,
        })
      );
      dispatch(
        sendNotification({
          type: NOTIFICATION_SUCCESS,
          message: "Successfully created an organization",
        })
      );
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_ERROR,
          message: "User is already a part of an organization",
        })
      );
    }
    dispatch(stopSpinner());
  };
};
