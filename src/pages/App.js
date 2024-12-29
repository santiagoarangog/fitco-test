import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../core/hooks/useAuth";
import { Layout } from "../components/Layout";

import "../styles/App.css";

const App = () => {
  const { pathname } = useLocation();
  const { isAuth } = useAuth();

  return (
    <section className="App">
      {!isAuth || pathname === "/change-password" ? (
        <main className="main">
          <Outlet />
        </main>
      ) : (
        <Layout>
          <Outlet />
        </Layout>
      )}
    </section>
  );
};

export { App };
