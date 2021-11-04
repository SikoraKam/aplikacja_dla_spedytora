import create, { SetState } from "zustand";
import { ProfileTypeEnum } from "../types/user/ProfileTypeEnum";

interface ProfileStore {
  _id: string | null;
  setId(id: string | null): void;
  profileType: ProfileTypeEnum | null;
  setProfileType(type: ProfileTypeEnum): void;
  reset(): void;
}

const getInitialState = (set: SetState<ProfileStore>) => ({
  _id: null,
  profileType: null,
  setId: (id: string) => set(() => ({ _id: id })),
  setProfileType: (type: ProfileTypeEnum) => set(() => ({ profileType: type })),
});

export const useProfileStore = create<ProfileStore>((set) => ({
  ...getInitialState(set),
  reset: () => set(() => getInitialState(set)),
}));
