import { UserCountry, UserEmail, UserId, UserLanguage, UserPassword, UserToken } from '../Utility/User';

export interface RegisterRequestBody {
  email: UserEmail;
  password: UserPassword;
  country: UserCountry;
  language: UserLanguage;
}

export interface UserResponse {
  country: UserCountry;
  language: UserLanguage;
  id: UserId;
  email: UserEmail;
  token: UserToken;
}

export type ZellyUser = UserResponse;
