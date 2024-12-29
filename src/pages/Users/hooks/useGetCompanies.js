import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetCompanies = (payloadOptions) => {
  const data = useQuery(
    ["getCompanies", payloadOptions],
    () => axiosClient.post(`company/getcompanies`, payloadOptions),
    { enabled: payloadOptions !== null }
  );

  return data;
};
export default useGetCompanies;
