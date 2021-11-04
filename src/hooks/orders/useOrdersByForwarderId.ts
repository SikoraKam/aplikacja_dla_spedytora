import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { QUERY_ORDERS_FORWARDER } from "../../constants/queryConstants";

export const useOrdersByForwarderId = (id: string) => {
  const { data, error } = useSWR(`${QUERY_ORDERS_FORWARDER}/${id}`, fetcher);

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
};
