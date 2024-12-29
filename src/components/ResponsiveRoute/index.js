import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import { Navigate } from "react-router-dom";

export { ResponsiveRoute };

function ResponsiveRoute({ children }) {
  const isMobile = useMediaQuery({
    query: `(max-width: 550px)`,
  });

  if (!isMobile) {
    return <Navigate to="/" />;
  }

  return children;
}

ResponsiveRoute.propTypes = {
  children: PropTypes.node,
};