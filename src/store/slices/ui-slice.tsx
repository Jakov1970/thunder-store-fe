import { createSlice } from "@reduxjs/toolkit";
import { NotificationState } from "../../utils/types/slice";
import { RootState } from "./../index";

const initialNotificationState: NotificationState = {
  notificationType: undefined,
  notificationMessage: "",
  notificationLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialNotificationState,
  reducers: {
    sendNotification: (state, action) => {
      state.notificationMessage = action.payload.message;
      state.notificationType = action.payload.type;
    },
    startSpinner: (state) => {
      state.notificationLoading = true;
    },
    stopSpinner: (state) => {
      state.notificationLoading = false;
    },
  },
});

export const { sendNotification, stopSpinner, startSpinner } = uiSlice.actions;

export const ui = (state: RootState) => state.ui;

export default uiSlice.reducer;
