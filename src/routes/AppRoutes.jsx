import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "../app/components/layouts/Layout";
import Setting from "../features/settings/Setting";
import PersonalDetails from "../features/profile/PersonalDetails";

// Lazy load components
const UsersList = lazy(() => import("../features/users/UsersList"));
const Login = lazy(() => import("../features/login/Login"));
const Dashboard = lazy(() => import("../app/components/layouts/Dashboard"));

// Fallback component for Suspense
const Loading = () => <div>Loading...</div>;

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Routes that are not wrapped with Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Routes that are wrapped with Layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users-list" element={<UsersList />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="profile" element={<PersonalDetails />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
