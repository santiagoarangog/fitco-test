import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../core/hooks/useAuth";

export { PublicRoute };

function PublicRoute({ children }) {
  const { isAuth } = useAuth();
  return isAuth ? <Navigate to="/projects" /> : children;
}

PublicRoute.propTypes = {
  children: PropTypes.node,
};