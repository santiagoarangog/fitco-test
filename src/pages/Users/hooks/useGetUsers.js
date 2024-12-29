import { useQuery } from "react-query";
import { axiosClient } from "../../../core/services/axiosInstance";

const useGetUsers = () => {
  const data = useQuery(["usersList"], () => axiosClient.get(`User`));

  return data;
};
export default useGetUsers;