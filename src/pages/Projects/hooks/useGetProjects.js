import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetProjects = (payloadOptions) => {
  const data = useQuery(
    ["getProjects", payloadOptions],
    () => axiosClient.get(`events?limit=${payloadOptions.limit}&offset=${payloadOptions.offset}`),
  );

  return data;
};
export default useGetProjects;
