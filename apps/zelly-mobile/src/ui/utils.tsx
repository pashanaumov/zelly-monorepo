export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) {
    return 'Email cannot be empty.';
  }
  if (!re.test(email)) {
    return 'Oops! We need a valid email address.';
  }

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) {
    return 'Password cannot be empty.';
  }

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) {
    return 'Name cannot be empty.';
  }

  return '';
};

export const countryValidator = (country: string) => {
  if (!country || country.length <= 0) {
    return 'Country cannot be empty.';
  }

  return '';
};

export const ageRangeValidator = (ageRange: string) => {
  if (!ageRange || ageRange.length <= 0) {
    return 'Age range cannot be empty.';
  }

  return '';
};
