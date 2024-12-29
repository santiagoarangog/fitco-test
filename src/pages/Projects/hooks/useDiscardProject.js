import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useDiscardProject = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post("/discard-project", formData);
  });
  return mutation;
};
export default useDiscardProject;
