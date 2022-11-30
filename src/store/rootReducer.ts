import { combineReducers } from "redux";
import { authReducer } from "./slices/authSlice";
import { groupReducer } from "./slices/groupSlice";
import { projectReducer } from "./slices/projectSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  group: groupReducer,
  project: projectReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
