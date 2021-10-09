import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

export const useUser = () => {
  const { data, error } = useSWR("users/user", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
