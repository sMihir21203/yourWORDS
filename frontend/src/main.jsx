import { createRoot } from "react-dom/client";
import "./index.css";
import { WebRoutes } from "./Routes/Routes.jsx";
import { store, persistor } from "./Store/store.js"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/es/integration/react";
import { ThemeProvider } from './Components/CompsIndex.js'

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <WebRoutes />
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
