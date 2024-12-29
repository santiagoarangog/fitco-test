import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetProjectStrategies = (projectId) => {
  const data = useQuery(
    ["getProjectStrategies", projectId],
    () => axiosClient.get(`teaser/${projectId}/strategies`),
    { enabled: !!projectId }
  );

  return data;
};
export default useGetProjectStrategies;
