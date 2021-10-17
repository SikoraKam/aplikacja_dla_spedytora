import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

export const useProviders = () => {
  const { data, error } = useSWR("users/providers", fetcher);

  return {
    providers: data,
    isLoading: !error && !data,
    isError: error,
  };
};
