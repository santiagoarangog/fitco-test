import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useSendEmailResetPassword = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post("/auth/reset-password", formData);
  });
  return mutation;
};
export default useSendEmailResetPassword;
