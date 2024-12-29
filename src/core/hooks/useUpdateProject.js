import { useMutation } from "react-query";
import { axiosClient } from "../services/axiosInstance";

const useUpdateProject = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.put(`/project/${formData.id}`, formData);
  });
  return mutation;
};
export default useUpdateProject;
