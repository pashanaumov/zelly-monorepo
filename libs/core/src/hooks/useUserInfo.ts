import { useSelector } from 'react-redux';
import { RootState } from '../redux/storeWeb';

export function useUserInfo() {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    return {
      country: '',
      language: '',
      id: '',
      email: '',
      token: '',
    };
  }

  return {
    country: user?.country || '',
    id: user?.id || '',
    email: user?.email || '',
    token: user?.token || '',
    username: user?.email.substring(0, user?.email.lastIndexOf('@')) || '',
  };
}
