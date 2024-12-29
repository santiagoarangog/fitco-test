import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useLoginLink = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post("/auth/loginFromEmail", formData);
  });
  return mutation;
};
export default useLoginLink;
