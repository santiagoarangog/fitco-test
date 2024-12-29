import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useRegister = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post("/user/register", formData);
  });
  return mutation;
};
export default useRegister;