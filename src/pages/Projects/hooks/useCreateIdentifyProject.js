import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useCreateIdentifyProject = () => {
  const mutation = useMutation((payload) => {
    return axiosClient.post(`/project/target-project`, payload);
  });
  return mutation;
};
export default useCreateIdentifyProject;