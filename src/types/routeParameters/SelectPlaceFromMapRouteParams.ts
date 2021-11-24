import { PlaceObject } from "../places/PlaceObject";

interface SelectPlaceFromMapRouteParams {
  destinationsArray?: PlaceObject[];
  setDestinationsArray?(places: PlaceObject[]): void;
  setPlaceStart?(place: PlaceObject): void;
  selectStartPlace: boolean;
}
