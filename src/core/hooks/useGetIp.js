import { useQuery } from "react-query";
import { axiosClient } from "../services/axiosInstance";

const useGetIpAddress = () => {
  const data = useQuery(["ipAddress"], () => axiosClient.get(`https://ipapi.co/json/`));
  return data;
};
export default useGetIpAddress;
