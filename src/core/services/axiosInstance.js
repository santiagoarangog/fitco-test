import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || 'http://localhost:80/',
});

const getLocalUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user;
};

const deleteLocalUser = () => {
  localStorage.removeItem("user");
};

const setLocalUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const isRefresTokenURL = (url) => {
  return url.includes("/refresh-token");
};

axiosClient.interceptors.request.use(
  (config) => {
    const user = getLocalUser();
    const isRefreshTokenUrl = isRefresTokenURL(config?.url);

    if (user) {
      if (isRefreshTokenUrl) {
        config.headers.Authorization = `Bearer ${user.data}`;
      } else {
        config.headers.Authorization = `Bearer ${user.data}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (
      error?.response?.status === 401 &&
      error.response.data.result.code === "Unauthorized"
    ) {
      deleteLocalUser();
      window.location.href = "/";
    }

    if (error?.response) {
      const isErrorFromRefresh = isRefresTokenURL(
        error?.response?.request?.responseURL
      );

      if (
        error?.response?.status === 401 &&
        !originalConfig._retry &&
        !isErrorFromRefresh
      ) {
        originalConfig._retry = true;
      }
    }

    return Promise.reject(error);
  }
);

export { axiosClient, deleteLocalUser, setLocalUser, getLocalUser };
