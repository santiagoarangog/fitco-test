import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useSendEmail = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post("/auth/sendLoginEmail", formData);
  });
  return mutation;
};
export default useSendEmail;
