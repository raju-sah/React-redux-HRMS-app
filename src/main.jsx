// src/index.js or src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";
import UsersList from "./features/users/UsersList";
import Toast from "./app/components/Toast";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <Toast />
      <UsersList />
    </Provider>
  </StrictMode>
);
