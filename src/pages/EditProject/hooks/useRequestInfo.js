import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useRequestInfo = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.patch("/project/request-additional-information", formData);
  });
  return mutation;
};
export default useRequestInfo;
