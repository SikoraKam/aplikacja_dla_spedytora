import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

export const useOrdersByForwarderId = (id: string) => {
  const { data, error } = useSWR(`orders/forwarder/${id}`, fetcher);

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
};
