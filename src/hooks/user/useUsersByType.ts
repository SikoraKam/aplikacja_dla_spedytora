import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { UserObject } from "../../types/user/UserObject";
import { QUERY_USERS } from "../../constants/queryConstants";

export const useUsersByType = (userProfileType: ProfileTypeEnum | null) => {
  const isForwarder = userProfileType === ProfileTypeEnum.Forwarder;
  // user want to get users with second type
  const queryString = isForwarder ? "providers" : "forwarders";
  const { data, error, mutate } = useSWR<UserObject[]>(
    userProfileType ? `${QUERY_USERS}/${queryString}` : null,
    fetcher
  );

  return {
    usersByType: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
