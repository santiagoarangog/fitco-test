import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useResetPassword = () => {
  const mutation = useMutation(({ formData, token }) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return axiosClient.post(`/auth/changePassword`, formData, { headers });
  });
  return mutation;
};
export default useResetPassword;
