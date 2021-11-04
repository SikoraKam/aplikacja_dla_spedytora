import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { QUERY_PROFILE } from "../../constants/queryConstants";

export const useProfile = () => {
  const { data, error } = useSWR(`${QUERY_PROFILE}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
