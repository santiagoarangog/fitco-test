import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useUpdateUser = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.put(`/User/${formData._id}`, formData);
  });
  return mutation;
};
export default useUpdateUser;