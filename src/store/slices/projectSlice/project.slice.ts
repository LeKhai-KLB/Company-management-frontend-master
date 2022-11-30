import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProjectInfo } from "~/services/projectServices";

export type TProjectSliceState = {
  project: TProjectInfo;
};

const initialState: TProjectSliceState = {
  project: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState: initialState,
  reducers: {
    set_project_info: (state, action: PayloadAction<TProjectInfo | null>) => {
      if (
        state.project &&
        JSON.stringify(action.payload) === JSON.stringify(state.project)
      )
        return;
      if (action.payload) {
        state.project = {
          ...action.payload,
          create_at: new Date(action.payload.create_at),
        };
      } else {
        Object.assign(state, initialState);
      }
    },
  },
});

export const { set_project_info } = projectSlice.actions;
export const projectReducer = projectSlice.reducer;
