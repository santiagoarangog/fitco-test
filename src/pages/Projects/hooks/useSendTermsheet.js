import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useSendTermsheet = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post("/termsheet", formData);
  });
  return mutation;
};
export default useSendTermsheet;
