import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

export const useProfile = () => {
  const { data, error } = useSWR(`profile`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
