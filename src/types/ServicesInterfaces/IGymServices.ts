export interface ISearchGymRequest {
  query: string;
  page?: number;
}

export interface IRegisterGymRequest {
  gym_name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

export interface IGymsNearbyRequest {
  user_latitude: number;
  user_longitude: number;
}
