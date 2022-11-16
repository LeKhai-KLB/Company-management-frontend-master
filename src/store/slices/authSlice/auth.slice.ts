import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserInfo } from "~/services/authServices";

export type TAuthSliceState = {
  user: TUserInfo;
  authenticated: boolean;
};

const initialState: TAuthSliceState = {
  user: {
    id: null,
    username: null,
    email: null,
    avatar: null,
    introduction: null,
    create_at: null,
  } as TUserInfo,
  authenticated: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    set_user: (
      state: TAuthSliceState,
      action: PayloadAction<TUserInfo | undefined>,
    ) => {
      console.log(action.payload);
      if (action.payload) {
        state.user = {
          ...action.payload,
          create_at: new Date(action.payload.create_at),
        };
        state.authenticated = true;
      } else {
        Object.assign(state, initialState);
      }
    },
  },
});

export const { set_user } = authSlice.actions;
export const authReducer = authSlice.reducer;
