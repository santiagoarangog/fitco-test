import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useCreateInvestmentCompany = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post(`/company/create-investment-company`, formData);
  });
  return mutation;
};
export default useCreateInvestmentCompany;
