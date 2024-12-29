import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetModel = (projectId) => {
  const data = useQuery(["financialModel", projectId], 
    () => axiosClient.get(`/financialmodel/${projectId}`
  ), { enabled: !!projectId });

  return data;
};
export default useGetModel;
