import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetCompany = () => {
  const data = useQuery("getCompanies", () => axiosClient.get(`company`));

  return data;
};
export default useGetCompany;
