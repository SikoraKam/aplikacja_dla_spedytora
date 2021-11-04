import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

export const useProviderPosition = (providerId: string) => {
  const { data, error } = useSWR(`positions/provider/${providerId}`, fetcher, {
    refreshInterval: 5000,
  });

  return {
    position: data,
    isLoading: !error && !data,
    isError: error,
  };
};
