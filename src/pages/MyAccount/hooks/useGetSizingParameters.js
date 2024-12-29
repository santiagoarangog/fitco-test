import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetSizingParameters = (companyId) => {
  const data = useQuery(
    ["getSizingParameters", companyId],
    () => axiosClient.get(`/financingSource/company/${companyId}`),
    { enabled: companyId !== null }
  );

  return data;
};
export default useGetSizingParameters;
