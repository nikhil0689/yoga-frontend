import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function ProtectedRoute({ children }) {
  useAxiosPrivate();
  const { user, isLoading, error } = useUser();
  const { auth } = useAuth();
  const { sessionUser } = auth;

  useEffect(() => {
    if (error && !isLoading) {
      toast.error("Log in please!!");
    }
  }, [error, isLoading, user]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!sessionUser) {
    // If user data is missing or there's an error, navigate to login
    return <Navigate replace to="login" />;
  }

  // 4. If there IS a user, render the app
  return children;
}

export default ProtectedRoute;
