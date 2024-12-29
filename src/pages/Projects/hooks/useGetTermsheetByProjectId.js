import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetTermsheetByProjectId = (projectId) => {
  const data = useQuery(
    ["termsheetInfo", projectId],
    () => axiosClient.get(`termsheet?projectId=${projectId}`),
    { enabled: !!projectId }
  );

  return data;
};
export default useGetTermsheetByProjectId;
