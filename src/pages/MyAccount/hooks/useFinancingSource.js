import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useFinancingSource = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post("/financingSource", formData);
  });
  return mutation;
};
export default useFinancingSource;
