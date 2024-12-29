import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetCompanyFindByStrategy = (strategyId) => {
  const data = useQuery(
    "getCompanyFindByStrategy",
    () => axiosClient.get(`company/find-by-strategy?strategyId=${strategyId}`),
    { enabled: !!strategyId }
  );

  return data;
};
export default useGetCompanyFindByStrategy;
