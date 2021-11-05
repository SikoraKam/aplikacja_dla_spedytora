import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { QUERY_ORDERS } from "../../constants/queryConstants";

export const useOrderById = (id: string) => {
  const { data, error } = useSWR(`${QUERY_ORDERS}/${id}`, fetcher);

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
};
