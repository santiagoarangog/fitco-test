import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetAllUsers = (payloadOptions) => {
  const data = useQuery(
    ["getAllUsers", payloadOptions],
    () => axiosClient.post(`User/getusers`, payloadOptions),
    { enabled: payloadOptions !== null }
  );

  return data;
};
export default useGetAllUsers;
