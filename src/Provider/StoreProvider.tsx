import { TWrapperProps } from "~/utils/mixins.type";
import { store, persistor } from "~/store";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";

export const StoreProvider = ({ children }: TWrapperProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
