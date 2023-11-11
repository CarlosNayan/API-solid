export interface IVerifyAndCreateUserRequest {
  user_name: string;
  email: string;
  password: string;
}

export interface IGetUserProfileRequest {
  id_user: string;
}

export interface IAuthenticateUserRequest {
  email: string;
  password: string;
}
