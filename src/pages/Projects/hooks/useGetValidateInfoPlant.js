import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetValidateInfoPlant = () => {
  const data = useQuery("validateInfoPlant", () =>
    axiosClient.get(`plant/additional-information/validate`)
  );

  return data;
};
export default useGetValidateInfoPlant;
