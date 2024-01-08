import React from "react";
import ReactDOM from "react-dom/client";
import { RouteList } from "./routes/RouteList";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/store";

// CSS
import "./assets/css/index.css";

// Material Tailwind
import { ThemeProvider } from "@material-tailwind/react";

// Skeleton
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

// Redux Persist
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SkeletonTheme baseColor="#cbd5e1" highlightColor="#f1f5f9">
          <ThemeProvider>
            <Toaster />
            <RouteList />
          </ThemeProvider>
        </SkeletonTheme>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
