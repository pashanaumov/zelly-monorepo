import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { UserEmail, UserPassword, UserPasswords } from '../../types/Utility/User';
import { RegisterRequestBody, UserAdminResponse, UserResponse } from '../../types/Auth/LoginResponse';
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

  loginAdmin(email: UserEmail, password: UserPassword) {
    const { setItem } = useAsyncStorage('user');
    const { POST } = apiService();

    return POST<UserAdminResponse>(loginUrl, { email, password }).then((response) => {
      console.log('UserAdminResponse', response);

      if (response.token && response.isAdmin) {
        setItem(response.token);
        return response;
      }
      return null;
    });
  },

  logout() {
    const { removeItem } = useAsyncStorage('user');
    removeItem();
  },

  register(body: RegisterRequestBody) {
    const { email, password, country, ageRange } = body;
    const { setItem } = useAsyncStorage('user');
    const { POST } = apiService();

    return POST<UserResponse>(registerUrl, {
      email,
      password,
      country,
      ageRange,
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

  async changeUserPassword({ oldPassword, newPassword }: UserPasswords) {
    const { PUT } = apiService();

    return await PUT<{
      error: boolean;
      description: string;
      user: UserResponse;
    }>(zellyUrls.changePassword, { oldPassword, newPassword });
  },

  async changeUserEmail(userEmail: UserEmail) {
    const { PUT } = apiService();

    return await PUT<UserResponse>(zellyUrls.changeEmail, { email: userEmail });
  },
};
