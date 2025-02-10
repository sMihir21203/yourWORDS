import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { WebRoutes } from "./Routes.jsx";
import {store, persistor} from "./Store/store.js"
import {Provider} from "react-redux"
import { PersistGate } from "redux-persist/es/integration/react";

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
    <WebRoutes />
  </Provider>
  </PersistGate>
);
