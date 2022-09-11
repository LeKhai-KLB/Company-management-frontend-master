import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyles } from "~/Components/GlobalStyle";
import "~/assets/icons/style.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <GlobalStyles>
    <App />
  </GlobalStyles>,
);
