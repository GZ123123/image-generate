export interface ILoginResponse {
  username: string;

  access_token: string;

  refresh_token: string;
}

export interface IRefreshResponse extends ILoginResponse {}

export interface IProfileResponse {
  _id: string;

  username: string;

  fullname: string;

  email: string;

  admin: boolean;
}
