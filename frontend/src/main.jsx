import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { WebRoutes } from "./Routes.jsx";
import {store} from "./Store/store.js"
import {Provider} from "react-redux"

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <WebRoutes />
  </Provider>
);
