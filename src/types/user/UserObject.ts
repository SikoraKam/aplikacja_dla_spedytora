import { ProfileTypeEnum } from "./ProfileTypeEnum";

export interface UserObject {
  _id: string;
  profileType: ProfileTypeEnum;
  email: string;
  lastName: string;
  name: string;
  rating?: number;

  phoneNumber?: string;
  preferredRatePerHour?: string;
  preferredStartPlaces?: string;
  additionalInfo?: string;
}
