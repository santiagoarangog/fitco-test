import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicRoute } from "../components/PublicRoute/PublicRoute";
import { App } from "./App";
import { Projects } from "./Projects";
import { Login } from "./Login";
import { ResetPassword } from "./ResetPassword";
import { ResetPasswordRequest } from "./ResetPasswordRequest";
import { Register } from "./Register";
import { LoginLink } from "./LoginLink";
import { LoadingLoginLink } from "./LoadingLoginLink";
import { MyAccount } from "./MyAccount";
import { NewProject } from "./NewProject";
import { ProjectDetail } from "./ProjectDetail";
import { EditProject } from "./EditProject";
import { Users } from "./Users";
import { ChangePassword } from "./ChangePassword";
import { VerifyAccount } from "./VerifyAccount";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="reset-password-request"
            element={
              <PublicRoute>
                <ResetPasswordRequest />
              </PublicRoute>
            }
          />
          <Route
            path="reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="email-sesion"
            element={
              <PublicRoute>
                <LoginLink />
              </PublicRoute>
            }
          />
          <Route
            path="loading-sesion"
            element={
              <PublicRoute>
                <LoadingLoginLink />
              </PublicRoute>
            }
          />
          <Route
            path="verify_account"
            element={
              <PublicRoute>
                <VerifyAccount />
              </PublicRoute>
            }
          />

          <Route path="projects">
            <Route index element={<Projects />} />

            <Route path="new-project" element={<NewProject />} />
            <Route path="edit-project" element={<EditProject />} />
            <Route path="project-detail" element={<ProjectDetail />} />
          </Route>

          <Route path="my-account">
            <Route index element={<MyAccount />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="users">
            <Route index element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
