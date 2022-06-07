import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./app/store";
import { SplashScreen } from "./pages";
import "./index.css";
// import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
const LazyApp = React.lazy(() => import("./App"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Suspense fallback={<SplashScreen />}>
          <LazyApp />
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>
);
