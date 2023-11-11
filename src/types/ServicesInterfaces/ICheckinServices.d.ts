export interface ICheckinUserRequest {
  id_user: string;
  id_gym: string;
  user_latitude: number;
  user_longitude: number;
}

export interface ICheckinUserHistoryRequest {
  id_user: string;
  page?: number;
}

export interface IGetUserMetricsRequest {
	id_user: string;
  }
  