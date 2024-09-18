import { lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "../app/components/layouts/Layout";
import Setting from "../features/settings/Setting";
import PersonalDetails from "../features/profile/PersonalDetails";
import AuthenticatedRoute from "../features/login/AuthenticatedRoute";
import CreateGroup from "../features/settings/CreateGroup";
import { HashLoader } from "react-spinners";
import CategoryIndex from "../features/books/bookscategory/Index";
import AuthorIndex from "../features/books/author/Index";
import BookIndex from "../features/books/Index";
  
// Lazy load components
const Login = lazy(() => import("../features/login/Login"));
const Dashboard = lazy(() => import("../app/components/layouts/Dashboard"));

// Loader component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <HashLoader color="#3B82F6" size={80} />
  </div>
);

// Wrapper component to delay content rendering
const DelayedContent = ({ children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return <Loader />;
  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <DelayedContent>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route
              element={
                <AuthenticatedRoute>
                  <Layout />
                </AuthenticatedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/books" element={<BookIndex />} />
              <Route path="/book-categories" element={<CategoryIndex />} />
              <Route path="/authors" element={<AuthorIndex />} />

              <Route path="/home" element={<Dashboard />} />
              <Route path="/settings" element={<Setting />} />
              <Route path="/profile" element={<PersonalDetails />} />
              <Route path="/create-group" element={<CreateGroup />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </DelayedContent>
    </Router>
  );
};

export default AppRoutes;