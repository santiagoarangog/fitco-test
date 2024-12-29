import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useSendCorporativeEmail = () => {
  const mutation = useMutation((data) => {
    const payload = {
      companyName: data.companyName
    };

    return axiosClient.post(`/project-request-upload`, payload);
  });
  return mutation;
};
export default useSendCorporativeEmail;