import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetCompanyById = (id) => {
  const data = useQuery(
    ["getCompanyById", id],
    () => axiosClient.get(`company/${id}`),
    { enabled: !!id }
  );

  return data;
};
export default useGetCompanyById;
