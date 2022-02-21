import React, { FC, ReactNode, useMemo } from 'react';
import { Text } from 'react-native';

interface Props {
  children: ReactNode;
  subscriptFontSize: number;
}

export const SubscriptText: FC<Props> = ({ children, subscriptFontSize }) => {
  const styles = useMemo(
    () => ({
      fontSize: subscriptFontSize,
    }),
    [subscriptFontSize],
  );
  return <Text style={styles}>{children}</Text>;
};
