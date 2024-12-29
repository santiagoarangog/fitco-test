import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useCreateUser = () => {
  const mutation = useMutation((payload) => {
    return axiosClient.post(`/user/register`, payload);
  });
  return mutation;
};
export default useCreateUser;