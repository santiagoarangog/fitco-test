import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useChangeOwner = () => {
  const mutation = useMutation((payload) => {
    return axiosClient.put(`/project/${payload.projectId}/change-owner`, { ownerId: payload.ownerId });
  });
  return mutation;
};
export default useChangeOwner;




