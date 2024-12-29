import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetUserInfo = (userId) => {
  const data = useQuery(
    ["getUserInfo", userId],
    () => axiosClient.get(`User/${userId}`), { enabled: userId !== null });

  return data;
};
export default useGetUserInfo;