import { useQuery } from "react-query";
import { axiosClient } from "../services/axiosInstance";

const useGetCompany = (companyId) => {
  const data = useQuery(
    ["companyList", companyId],
    () => axiosClient.get(`company/${companyId}`),
    { enabled: !!companyId }
  );
  return data;
};
export default useGetCompany;
