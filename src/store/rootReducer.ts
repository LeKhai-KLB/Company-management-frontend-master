import { combineReducers } from "redux";
import { authReducer } from "./slices/authSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
