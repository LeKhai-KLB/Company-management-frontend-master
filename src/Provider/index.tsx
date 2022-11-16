import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ApolloClientProvider } from "./ApolloClientProvider";
import { TWrapperProps } from "~/utils/mixins.type";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { MUIThemeProvider } from "./MUIThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalModalProvider } from "./GlobalModalProvider";
import { StoreProvider } from "./StoreProvider";

function ErrorFallback() {
  return (
    <div>
      <h1>Loaded error</h1>
      <h4>Something went wrong when fetching data</h4>
      <button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
}

function errorHanler(error: Error, info: any) {
  console.log(info);
}

export function AppProvider({ children }: TWrapperProps) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<ErrorFallback />} onError={errorHanler}>
          <CookiesProvider>
            <StoreProvider>
              <MUIThemeProvider>
                <Router>
                  <ApolloClientProvider>
                    <GlobalModalProvider>{children}</GlobalModalProvider>
                  </ApolloClientProvider>
                </Router>
              </MUIThemeProvider>
            </StoreProvider>
          </CookiesProvider>
        </ErrorBoundary>
      </Suspense>
      <ToastContainer theme={"dark"} />
    </>
  );
}
