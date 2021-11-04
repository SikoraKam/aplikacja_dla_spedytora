import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { QUERY_ORDERS_PLACES } from "../../constants/queryConstants";

export const useOrderById = (id: string) => {
  const { data, error } = useSWR(`${QUERY_ORDERS_PLACES}/${id}`, fetcher);

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
};
