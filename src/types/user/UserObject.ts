import { ProfileTypeEnum } from "./ProfileTypeEnum";

export interface UserObject {
  _id: string;
  profileType: ProfileTypeEnum;
  email: string;
  lastName: string;
  name: string;
}
