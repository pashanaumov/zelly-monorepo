import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { UserEmail, UserPassword } from '../../types/Utility/User';
import { RegisterRequestBody, UserResponse } from '../../types/Auth/LoginResponse';
import { apiService } from '../../services/apiService';
import { zellyUrls } from '../../Urls';

const loginUrl = `https://zelly-server.herokuapp.com/auth/login`;
const registerUrl = `https://zelly-server.herokuapp.com/auth/register`;

export const authService = {
  login(email: UserEmail, password: UserPassword) {
    const { setItem } = useAsyncStorage('user');
    const { POST } = apiService();

    return POST<UserResponse>(loginUrl, { email, password }).then((response) => {
      if (response.token) {
        setItem(response.token);
      }
      return response;
    });
  },

  logout() {
    const { removeItem } = useAsyncStorage('user');
    removeItem();
  },

  register(body: RegisterRequestBody) {
    const { email, password, country } = body;
    const { setItem } = useAsyncStorage('user');
    const { POST } = apiService();

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
  },

  checkUserToken() {
    const { GET } = apiService();

    return GET<UserResponse>(zellyUrls.checkUser)
      .then((user) => {
        console.log(user);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
