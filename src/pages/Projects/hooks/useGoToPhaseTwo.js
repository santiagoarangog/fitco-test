import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGoToPhaseTwo = () => {
  const mutation = useMutation((payload) => {
    return axiosClient.post(`/project/phase-two/${payload.projectId}`, payload);
  });
  return mutation;
};
export default useGoToPhaseTwo;