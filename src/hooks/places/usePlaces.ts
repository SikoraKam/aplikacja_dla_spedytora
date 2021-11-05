import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { QUERY_PLACES } from "../../constants/queryConstants";

export const usePlaces = () => {
  const { data, error } = useSWR(`${QUERY_PLACES}`, fetcher);

  return {
    places: data,
    isLoading: !error && !data,
    isError: error,
  };
};
