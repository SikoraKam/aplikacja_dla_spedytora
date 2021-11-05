import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";
import { OrderObject } from "../../types/orders/OrderObject";
import { QUERY_ORDERS } from "../../constants/queryConstants";

export const useOrders = (profileType: ProfileTypeEnum | null) => {
  const isForwarder = profileType === ProfileTypeEnum.Forwarder;
  const queryString = isForwarder ? "forwarder" : "provider";
  const { data, error, mutate } = useSWR<OrderObject[]>(
    profileType ? `${QUERY_ORDERS}/${queryString}` : null,
    fetcher
  );

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
