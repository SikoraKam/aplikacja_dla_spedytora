export interface CreateOrderPayload {
  dateStart: Date;
  dateEnd: Date;
  forwarderId?: string;
  providerId: string;
  placeStart: string;
  destinations: string[];
}
