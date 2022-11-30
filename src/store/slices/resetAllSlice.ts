import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { set_user } from "./authSlice";
import { set_group_info } from "./groupSlice";
import { set_project_info } from "./projectSlice";

export const resetAllSlice = (dispatch: Dispatch<AnyAction>) => {
  dispatch(set_user());
  dispatch(set_group_info());
  dispatch(set_project_info());
};
