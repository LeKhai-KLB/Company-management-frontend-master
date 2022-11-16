import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { set_user } from "./authSlice";

export const resetAllSlice = (dispatch: Dispatch<AnyAction>) => {
  dispatch(set_user());
};
