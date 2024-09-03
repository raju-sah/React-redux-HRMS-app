import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import store from "./app/store";
import Toast from "./app/components/Toast";
import "./index.css";
import Login from "./features/login/Login";
import UsersList from "./features/users/UsersList";  // Make sure this path is correct

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Toast />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);