import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TGroupInfo } from "~services/groupServices/groupService.types";

export type TGroupSliceState = {
  group: TGroupInfo;
};

const initialState: TGroupSliceState = {
  group: null,
};

export const groupSlice = createSlice({
  name: "group",
  initialState: initialState,
  reducers: {
    set_group_info: (state, action: PayloadAction<TGroupInfo | null>) => {
      if (
        state.group &&
        JSON.stringify(action.payload) === JSON.stringify(state.group)
      )
        return;
      if (action.payload) {
        state.group = {
          ...action.payload,
          create_at: new Date(action.payload.create_at),
        };
      } else {
        Object.assign(state, initialState);
      }
    },
  },
});

export const { set_group_info } = groupSlice.actions;
export const groupReducer = groupSlice.reducer;
