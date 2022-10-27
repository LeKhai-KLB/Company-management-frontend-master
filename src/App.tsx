import { AppProvider } from "~Provider";
import { AppRoutes } from "~Routes";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </div>
  );
}

export default App;
