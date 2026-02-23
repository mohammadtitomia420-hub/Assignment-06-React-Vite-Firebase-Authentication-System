import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center mt-20">Loading Auth...</div>;
  if (!user) return <Navigate to="/" replace />;

  return children;
}
