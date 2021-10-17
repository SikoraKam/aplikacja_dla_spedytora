import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";

export const useOrders = (profileType: ProfileTypeEnum | null) => {
  if (!profileType) {
    return {
      orders: null,
      isLoading: false,
      isError: new Error("profile type is null"),
    };
  }

  const isForwarder = profileType === ProfileTypeEnum.Forwarder;
  const queryString = isForwarder ? "forwarder" : "provider";
  const { data, error } = useSWR(`orders/${queryString}`, fetcher);

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
};
