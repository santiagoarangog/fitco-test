import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useUpdateFinancingSource = () => {
  const mutation = useMutation(({ id, formData }) => {
    return axiosClient.patch(`/financingSource/${id}`, formData);
  });
  return mutation;
};
export default useUpdateFinancingSource;
