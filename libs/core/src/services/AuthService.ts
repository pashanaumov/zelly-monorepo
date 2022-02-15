import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { UserEmail, UserPassword } from '../types/Utility/User';
import { RegisterRequestBody, UserResponse } from '../types/Auth/LoginResponse';
import { useApi } from './useApiService';

const loginUrl = `http://localhost:3000/auth/login`;
const registerUrl = `http://localhost:3000/auth/register`;

export function useAuthService() {
  const { setItem, removeItem } = useAsyncStorage('user');
  const { POST } = useApi();

  function login(email: UserEmail, password: UserPassword) {
    return POST<UserResponse>(loginUrl, { email, password }).then(
      (response) => {
        if (response.token) {
          setItem(response.token);
        }
        return response;
      }
    );
  }

  function logout() {
    removeItem();
  }

  function register(body: RegisterRequestBody) {
    const { email, password, language, country } = body;
    return POST<UserResponse>(registerUrl, {
      email,
      password,
      language,
      country,
    }).then((response) => {
      console.log('registration', response);
      if (response.token) {
        setItem(response.token);
      }
      return response;
    });
  }

  return {
    login,
    logout,
    register,
  };
}
