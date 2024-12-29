import React from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import { Toaster, ToastBar, toast } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { AppRouter } from "./pages/App.router";
import { persistor, store } from "./core/store/index";
import { theme } from "./styles/theme";
import { Link } from "./components/Link";
import { CloseIcon, SuccessAlertIcon } from "./assets/icons";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <Toaster
              position="top-right"
              reverseOrder={false}
              containerStyle={{ zIndex: 999999 }}
              toastOptions={{
                duration: 8000,
                success: {
                  icon: <SuccessAlertIcon />,
                  iconTheme: {
                    primary: theme.colors.alerts.iconSuccess,
                    secondary: theme.colors.alerts.success,
                  },
                  style: {
                    background: theme.colors.alerts.success,
                    color: theme.colors.blue,
                  },
                },
                error: {
                  style: {
                    background: theme.colors.white,
                    color: theme.colors.red,
                  },
                },
                style: {
                  minWidth: "400px",
                  zIndex: 999999,
                  color: theme.colors.black,
                  fontWeight: theme.fonts.weight.regular,
                  fontFamily: theme.fonts.family,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "38px",
                },
              }}
            >
              {(t) => (
                <ToastBar toast={t}>
                  {({ icon, message }) => (
                    <>
                      {icon}
                      {message}
                      {t.type !== "loading" && (
                        <Link
                          height="100%"
                          onClick={() => toast.dismiss(t.id)}
                          icon={
                            <CloseIcon
                              fill={
                                t.type === "error"
                                  ? theme.colors.alerts.iconError
                                  : t.type === "success"
                                  ? theme.colors.alerts.success
                                  : theme.colors.alerts.iconSuccess
                              }
                            />
                          }
                        />
                      )}
                    </>
                  )}
                </ToastBar>
              )}
            </Toaster>
            <ThemeProvider theme={theme}>
              <AppRouter />
            </ThemeProvider>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
