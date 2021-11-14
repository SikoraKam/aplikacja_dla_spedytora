import { ProfileTypeEnum } from "./ProfileTypeEnum";
import { PlaceObject } from "../places/PlaceObject";

export interface UserObject {
  _id: string;
  profileType: ProfileTypeEnum;
  email: string;
  lastName: string;
  name: string;
  rating?: number;

  phoneNumber?: string;
  preferredRatePerHour?: string;
  // preferredStartPlaces?: string;
  availableStartPlaces: PlaceObject[];
  additionalInfo?: string;
}

export interface UserObjectFormValues {
  lastName?: string;
  name?: string;
  rating?: number;
  phoneNumber?: string;
  preferredRatePerHour?: string;
  // preferredStartPlaces?: string;
  availableStartPlaces: PlaceObject[];
  additionalInfo?: string;
}
