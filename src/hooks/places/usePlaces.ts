import { ProfileTypeEnum } from "../../types/user/ProfileTypeEnum";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

export const usePlaces = () => {
  const { data, error } = useSWR(`places`, fetcher);

  return {
    places: data,
    isLoading: !error && !data,
    isError: error,
  };
};
