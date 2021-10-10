import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

export const useOrderById = (id: string) => {
  const { data, error } = useSWR(`orders/${id}`, fetcher);

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
};
