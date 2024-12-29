
import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGenerateFinancingModel = () => {
  const mutation = useMutation((projectId) => {
    return axiosClient.post(`/financialmodel/generateFinantialModelInput/${projectId}`);
  });
  return mutation;
};
export default useGenerateFinancingModel;
