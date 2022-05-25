import Toast from '@zelly/core/components/Toast';
import { authService } from '@zelly/core/redux/sagas/authService';
import { UserResponse } from '@zelly/core/types/Auth/LoginResponse';
import { UserPasswords } from '@zelly/core/types/Utility/User';
import { useMutation } from 'react-query';

export function useChangeUserPassword(successCallback: () => void) {
  const { mutateAsync, isLoading } = useMutation('changeUserPassword', (passwords: UserPasswords) => authService.changeUserPassword(passwords), {
    onSuccess: (data: { error: boolean; description: string; user: UserResponse }) => {
      if (data.error) {
        return Toast.showToast({
          type: 'error',
          text1: 'Error',
          text2: data.description,
        });
      }

      successCallback();
      return Toast.showToast({
        type: 'success',
        text1: 'Success',
        text2: 'Successfully changed password',
      });
    },
    onError: (err: any) => {
      return Toast.showToast({
        type: 'error',
        text1: 'Error',
        text2: err.description,
      });
    },
  });

  return {
    mutateAsync,
    isLoading,
  };
}
