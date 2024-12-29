import { useMutation } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useSendInvestorsNotification = () => {
  const mutation = useMutation((formData) => {
    return axiosClient.post(
      "/investors-notification/sendInvestorsNotification",
      formData
    );
  });
  return mutation;
};
export default useSendInvestorsNotification;
