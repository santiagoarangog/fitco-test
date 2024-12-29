import { useQuery } from "react-query";
import { axiosClient } from "../services/axiosInstance";

const useGetProjectInfo = (projectId) => {
  const data = useQuery(
    ["getProjectInfo", projectId],
    () => axiosClient.get(`project/${projectId}`),
    { enabled: projectId !== null }
  );

  return data;
};
export default useGetProjectInfo;
