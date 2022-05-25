// useChangeUserEmail

import Toast from '@zelly/core/components/Toast';
import { authService } from '@zelly/core/redux/sagas/authService';
import { setUser } from '@zelly/core/redux/userSlice';
import { authUser } from '@zelly/core/redux/authSlice';
import { UserResponse } from '@zelly/core/types/Auth/LoginResponse';
import { UserEmail } from '@zelly/core/types/Utility/User';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export function useChangeUserEmail(successCallback: () => void) {
  const dispatch = useDispatch();
  const { setItem } = useAsyncStorage('user');
  const { mutateAsync, isLoading } = useMutation('changeUserEmail', (email: UserEmail) => authService.changeUserEmail(email), {
    onSuccess: (data: UserResponse) => {
      if (data.token) {
        dispatch(setUser({ user: data }));
        dispatch(authUser(data.token));
        setItem(data.token);
        successCallback();
      }
    },
    onError: (err: any) => {
      return Toast.showToast({
        type: 'error',
        text1: 'Error',
        text2: err.message,
      });
    },
  });

  return {
    mutateAsync,
    isLoading,
  };
}
