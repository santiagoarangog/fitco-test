import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const localStorageUser = localStorage.getItem("user");
  const [isAuth, setIsAuth] = useState(!!localStorageUser);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const publicRoutes = [
      "/reset-password",
      "/reset-password-request",
      "/register",
      "/email-sesion",
      "/loading-sesion",
      "/verify_account"
    ];
    if (!localStorageUser) {
      setIsAuth(false);

      !publicRoutes.includes(pathname) && navigate("/");
    }

    if (localStorageUser) {
      setIsAuth(true);
    }
  }, [dispatch, navigate, localStorageUser, pathname]);

  return { isAuth };
};
