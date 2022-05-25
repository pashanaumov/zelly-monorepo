export type UserEmail = string;
export type UserPassword = string;

export type UserCountry = string;
export type UserLanguage = 'RU' | 'ENG';
export type UserId = string;
export type UserToken = string;
export type UserAgeRange = string;

export type UserPasswords = {
  oldPassword: UserPassword;
  newPassword: UserPassword;
};
