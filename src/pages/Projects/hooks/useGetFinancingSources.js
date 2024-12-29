import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetFinancingSource = () => {
  const data = useQuery("financingSourcesList", () => axiosClient.get(`/financingSource`));

  return data;
};
export default useGetFinancingSource;
