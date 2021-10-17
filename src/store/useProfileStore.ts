import create from "zustand";
import { ProfileTypeEnum } from "../types/user/ProfileTypeEnum";

interface ProfileStore {
  _id: string | null;
  setId(id: string | null): void;
  profileType: ProfileTypeEnum | null;
  setProfileType(type: ProfileTypeEnum): void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  _id: null,
  setId: (id: string) => set(() => ({ _id: id })),

  profileType: null,
  setProfileType: (type: ProfileTypeEnum) => set(() => ({ profileType: type })),
}));
