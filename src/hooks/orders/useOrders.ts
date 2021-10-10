import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";

export const useOrders = (profileType: ProfileTypeEnum) => {
  const isForwarder = profileType === ProfileTypeEnum.Forwarder;
  const queryString = isForwarder ? "forwarder" : "provider";
  const { data, error } = useSWR(`orders/${queryString}`, fetcher);

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
};
