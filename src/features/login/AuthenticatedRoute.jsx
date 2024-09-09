import { useEffect, useMemo, useCallback } from "react";
import { Navigate } from "react-router-dom";

// Simulate authentication check (replace with actual logic)
const isAuthenticated = () => {
  const loginTime = localStorage.getItem("loginTime");
  if (!loginTime) return false;

  const currentTime = new Date().getTime();
  const oneHour = 60 * 60 * 1000;

  return currentTime - loginTime < oneHour;
};

const logoutAndRedirect = () => {
  localStorage.removeItem("loginTime"); // Remove login time
  window.location.href = "/login";
};

const AuthenticatedRoute = ({ children }) => {
  const authenticated = useMemo(isAuthenticated, []);

  const checkSession = useCallback(() => {
    if (!authenticated) {
      logoutAndRedirect();
    }
  }, [authenticated]);

  useEffect(() => {

    // Check session every minute
    const interval = setInterval(checkSession, 60 * 1000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, [checkSession]);

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default AuthenticatedRoute;