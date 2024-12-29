import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useSendFinancingSource = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post(
      "/project/update-financingsource",
      formData
    );
  });
  return mutation;
};
export default useSendFinancingSource;
