import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { QUERY_PROVIDERS } from "../../constants/queryConstants";

export const useProviders = () => {
  const { data, error } = useSWR(`${QUERY_PROVIDERS}`, fetcher);

  return {
    providers: data,
    isLoading: !error && !data,
    isError: error,
  };
};
