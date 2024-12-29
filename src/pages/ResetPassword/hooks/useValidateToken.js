import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useValidateToken = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post(`/auth/validateToken`, formData);
  });
  return mutation;
};
export default useValidateToken;
