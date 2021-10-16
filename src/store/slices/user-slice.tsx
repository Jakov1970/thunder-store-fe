import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../utils/types/slice";
import { RootState } from "./../index";

export const initialUserState: UserState = {
  email: "",
  name: "",
  surname: "",
  bucketName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    getData: (state, { payload }) => {
      state = payload;
    },
    showData: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.bucketName = action.payload.email.split("@")[0];
    },
  },
});

export const { showData, getData } = userSlice.actions;
export const user = (state: RootState) => state.user;
export default userSlice.reducer;
