import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useCreateProject = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post("/project", formData);
  });
  return mutation;
};
export default useCreateProject;
