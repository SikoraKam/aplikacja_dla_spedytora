import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

export const useOrdersByProviderId = (id: string) => {
  const { data, error } = useSWR(`orders/provider/${id}`, fetcher);

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
};
