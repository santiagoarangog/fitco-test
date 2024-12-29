import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetDevelopmentCompanies = () => {
  const mutation = useMutation((payload) => {
    return axiosClient.post(`company/getcompanies`, payload);
  });
  return mutation;
};
export default useGetDevelopmentCompanies;