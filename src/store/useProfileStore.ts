import create, { SetState } from "zustand";
import { ProfileTypeEnum } from "../types/user/ProfileTypeEnum";

interface ProfileStore {
  _id: string | null;
  profileType: ProfileTypeEnum | null;
  nameAndLastName: string;
  setId(id: string | null): void;
  setProfileType(type: ProfileTypeEnum): void;
  setNameAndLastName(val: string): void;
  reset(): void;
}

const getInitialState = (set: SetState<ProfileStore>) => ({
  _id: null,
  profileType: null,
  nameAndLastName: "",
  setId: (id: string) => set(() => ({ _id: id })),
  setProfileType: (type: ProfileTypeEnum) => set(() => ({ profileType: type })),
  setNameAndLastName: (value: string) =>
    set(() => ({ nameAndLastName: value })),
});

export const useProfileStore = create<ProfileStore>((set) => ({
  ...getInitialState(set),
  reset: () => set(() => getInitialState(set)),
}));
