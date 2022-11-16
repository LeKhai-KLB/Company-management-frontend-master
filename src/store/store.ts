import { configureStore } from "@reduxjs/toolkit";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import { rootReducer, RootReducer } from "./rootReducer";
import { persistReducer, persistStore } from "reduxjs-toolkit-persist";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = RootReducer;
