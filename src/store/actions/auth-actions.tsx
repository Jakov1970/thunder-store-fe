import { login, logout, refreshToken } from "../slices/auth";
import { sendNotification } from "../slices/ui-slice";
import {
  postAuth,
  getAuth,
  refreshTokenService,
} from "../../service/auth-service";

import {
  NOTIFICATION_INFO,
  NOTIFICATION_ERROR,
  NOTIFICATION_WARNING,
  NOTIFICATION_SUCCESS,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  SUCCESS_REGISTER,
  ERROR_TRY_AGAIN,
  SUCCESS_REGISTER_GOOGLE,
  SUCCESS_LOGOUT,
} from "../../utils/consts";

import { User } from "../../utils/types/actions";
import { routes } from "../../constants/routes";
import { messages } from "../../constants/messages";
import { filePathLogOut } from "../slices/file-slice";

export const loginAction = ({ email, password }: User) => {
  return async (dispatch: any) => {
    const res = await postAuth(routes.LOG_IN, { email, password });
    const { ok, data } = res;
    if (ok) {
      const { access_token, refresh_token } = data;
      dispatch(
        login({ accessToken: access_token, refreshToken: refresh_token })
      );
      window.location.replace(routes.HOME);
      dispatch(
        sendNotification({
          type: NOTIFICATION_SUCCESS,
          message: SUCCESS_LOGIN,
        })
      );
    } else if (data === null) {
      dispatch(
        sendNotification({
          type: NOTIFICATION_WARNING,
          message: ERROR_TRY_AGAIN,
        })
      );
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_ERROR,
          message: ERROR_LOGIN,
        })
      );
    }
  };
};

export const registerAction = ({ email, password, name, surname }: User) => {
  return async (dispatch: any) => {
    const res = await postAuth(routes.REGISTER, {
      email,
      password,
      name,
      surname,
    });
    if (res.ok) {
      window.location.replace(routes.LOG_IN);
      dispatch(
        sendNotification({
          type: NOTIFICATION_INFO,
          message: SUCCESS_REGISTER,
        })
      );
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_WARNING,
          message: ERROR_TRY_AGAIN,
        })
      );
    }
  };
};

export const googleLoginAction = ({ email, name, surname }: User) => {
  return async (dispatch: any) => {
    const res = await postAuth(routes.GOOGLE_LOGIN, { email, name, surname });
    const { ok, data } = res;
    if (ok) {
      const { access_token, refresh_token } = data;
      dispatch(
        login({ accessToken: access_token, refreshToken: refresh_token })
      );
      window.location.replace(routes.HOME);
      dispatch(
        sendNotification({
          type: NOTIFICATION_SUCCESS,
          message: SUCCESS_LOGIN,
        })
      );
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_ERROR,
          message: ERROR_TRY_AGAIN,
        })
      );
    }
  };
};

export const googleRegisterAction = ({ email, name, surname }: User) => {
  return async (dispatch: any) => {
    const res = await postAuth(routes.GOOGLE_REGISTER, {
      email,
      name,
      surname,
    });
    const { ok, data } = res;
    if (ok) {
      const { access_token, refresh_token } = data;
      dispatch(
        login({ accessToken: access_token, refreshToken: refresh_token })
      );
      window.location.replace(routes.HOME);
      dispatch(
        sendNotification({
          type: NOTIFICATION_SUCCESS,
          message: SUCCESS_REGISTER_GOOGLE,
        })
      );
    } else {
      if (res.status === 409) {
        dispatch(googleLoginAction({ email, name, surname }));
        return;
      }
      dispatch(
        sendNotification({
          type: NOTIFICATION_ERROR,
          message: ERROR_TRY_AGAIN,
        })
      );
    }
  };
};

export const logOutUser = () => {
  return (dispatch: any) => {
    dispatch(logout());
    dispatch(filePathLogOut());
    window.location.replace(routes.ROOT);
    dispatch(
      sendNotification({
        type: NOTIFICATION_INFO,
        message: SUCCESS_LOGOUT,
      })
    );
  };
};

export const refreshTokenAction = (jwt: string) => {
  return async (dispatch: any) => {
    const res = await refreshTokenService(jwt);
    const { ok, data } = res;
    if (ok) {
      const { access_token, refresh_token } = data;
      dispatch(
        refreshToken({ accessToken: access_token, refreshToken: refresh_token })
      );
      // dispatch(
      //   sendNotification({
      //     type: NOTIFICATION_INFO,
      //     message: "Token has been refreshed!",
      //   })
      // );
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
  };
};
