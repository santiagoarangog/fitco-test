import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useAuth = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post("/auth/login", formData);
  });
  return mutation;
};
export default useAuth;
