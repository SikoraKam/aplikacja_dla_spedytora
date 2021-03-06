import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { QUERY_USERS_USER } from "../../constants/queryConstants";

export const useUser = () => {
  const { data, error, mutate } = useSWR(`${QUERY_USERS_USER}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
