import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useCreateModel = () => {
  const mutation = useMutation((payload) => {
    return axiosClient.post(`/financialmodel`, payload);
  });
  return mutation;
};
export default useCreateModel;