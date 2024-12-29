import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetDevelopmentUsers = () => {
  const mutation = useMutation((payload) => {
    return axiosClient.post(`User/getusers`, payload);
  });
  return mutation;
};
export default useGetDevelopmentUsers;