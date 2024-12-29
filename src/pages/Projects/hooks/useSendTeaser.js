import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useSendTeaser = () => {
  const mutation = useMutation(({ teaserId, formData }) => {
    return axiosClient.put(`/teaser/${teaserId}/publish`, formData);
  });
  return mutation;
};
export default useSendTeaser;
