import React from 'react';
import { useUserInfo } from '@zelly/core/hooks/useUserInfo';
import { Avatar as PaperAvatar } from 'react-native-paper';

export const Avatar = () => {
  const { email } = useUserInfo();

  const parsedAvatar = email
    .split(' ')
    .map((n) => n[0])
    .join('.')
    .toUpperCase();

  return <PaperAvatar.Text size={120} label={parsedAvatar} />;
};
