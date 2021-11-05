import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { QUERY_ORDERS_PROVIDER } from "../../constants/queryConstants";

export const useOrdersByProviderId = (id: string) => {
  const { data, error } = useSWR(`${QUERY_ORDERS_PROVIDER}/${id}`, fetcher);

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
};
