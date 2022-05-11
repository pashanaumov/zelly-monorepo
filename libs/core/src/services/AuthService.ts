import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { UserEmail, UserPassword } from '../types/Utility/User';
import { RegisterRequestBody, UserResponse } from '../types/Auth/LoginResponse';
import { apiService } from './apiService';
import { zellyUrls } from '../Urls';

const loginUrl = `https://zelly-server.herokuapp.com/auth/login`;
const registerUrl = `https://zelly-server.herokuapp.com/auth/register`;

export function authService() {
  const { setItem, removeItem } = useAsyncStorage('user');
  const { POST, GET } = apiService();

  function login(email: UserEmail, password: UserPassword) {
    return POST<UserResponse>(loginUrl, { email, password }).then((response) => {
      if (response.token) {
        setItem(response.token);
      }
      return response;
    });
  }

  function logout() {
    removeItem();
  }

  function register(body: RegisterRequestBody) {
    const { email, password, country } = body;

    return POST<UserResponse>(registerUrl, {
      email,
      password,
      country,
    }).then((response) => {
      if (response.token) {
        setItem(response.token);
      }
      return response;
    });
  }

  function checkUserToken() {
    return GET<UserResponse>(zellyUrls.checkUser)
      .then((user) => {
        console.log(user);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return {
    login,
    logout,
    register,
    checkUserToken,
  };
}
