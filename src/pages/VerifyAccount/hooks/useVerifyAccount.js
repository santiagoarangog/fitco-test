import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useVerifyAccount = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post("/auth/validate-token", formData);
  });
  return mutation;
};
export default useVerifyAccount;
