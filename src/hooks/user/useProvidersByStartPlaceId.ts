import useSWR from "swr";
import { UserObject } from "../../types/user/UserObject";
import { QUERY_PROVIDERS } from "../../constants/queryConstants";
import { fetcher } from "../../utils/fetcher";

//currently not used
export const useProvidersByStartPlaceId = (startPlaceId: string | null) => {
  const { data, error, mutate } = useSWR<UserObject[]>(
    startPlaceId ? `${QUERY_PROVIDERS}/${startPlaceId}` : null,
    fetcher
  );

  return {
    providersByStartPlaceId: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
