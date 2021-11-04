import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { QUERY_POSITIONS_PROVIDER } from "../../constants/queryConstants";

export const useProviderPosition = (providerId: string) => {
  const { data, error } = useSWR(
    `${QUERY_POSITIONS_PROVIDER}/${providerId}`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  return {
    position: data,
    isLoading: !error && !data,
    isError: error,
  };
};
