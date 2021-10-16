import authReducer from "./slices/auth";
import uiReducer from "./slices/ui-slice";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import fileSlice from "./slices/file-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    user: userReducer,
    file: fileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export * from "./actions";
export * from "./slices";
