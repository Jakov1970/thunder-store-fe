import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

import {
  LS_AUTH_ACCESS_TOKEN,
  LS_AUTH_CURRENT_TIME,
  LS_AUTH_START_TIME,
  LS_AUTH_IS_LOGIN,
  TEST_1_MINUTE_MS,
  LS_AUTH_REFRESH_TOKEN,
} from "../../utils/consts";
import { AuthState } from "../../utils/types/slice";
import { getValueFromLocalStorage } from "../../utils/functions/store";

export const initialAuthState: AuthState = {
  refreshToken: localStorage.getItem(LS_AUTH_REFRESH_TOKEN) || null,
  accessToken: localStorage.getItem(LS_AUTH_ACCESS_TOKEN) || null,
  isLogin: !!localStorage.getItem(LS_AUTH_ACCESS_TOKEN),
  startTime: Number(getValueFromLocalStorage(LS_AUTH_START_TIME)),
  currentTime: Number(getValueFromLocalStorage(LS_AUTH_CURRENT_TIME)),
};

const getFinshedTime = () => Date.now() + TEST_1_MINUTE_MS;

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem(LS_AUTH_REFRESH_TOKEN, action.payload.refreshToken);
      localStorage.setItem(LS_AUTH_ACCESS_TOKEN, action.payload.accessToken);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLogin = !!state.accessToken;
      state.startTime = getFinshedTime();
      state.currentTime = Date.now();
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;

      state.isLogin = !!state.accessToken;
      state.startTime = 0;
      state.currentTime = 0;
      localStorage.removeItem(LS_AUTH_ACCESS_TOKEN);
      localStorage.removeItem(LS_AUTH_REFRESH_TOKEN);
    },
    refreshToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLogin = !!state.accessToken;
      state.startTime = getFinshedTime();
      state.currentTime = Date.now();
      localStorage.setItem(LS_AUTH_REFRESH_TOKEN, action.payload.refreshToken);
      localStorage.setItem(LS_AUTH_ACCESS_TOKEN, action.payload.accessToken);
    },
  },
});
export const startTime = (state: RootState) => state.auth.startTime;
export const currentTime = (state: RootState) => state.auth.currentTime;

export const { login, logout, refreshToken } = authSlice.actions;
export const auth = (state: RootState) => state.auth;
export default authSlice.reducer;
