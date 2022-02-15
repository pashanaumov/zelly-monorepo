import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { AppStackNavigation } from './AppNavigator';

interface Props {
  back: boolean;
  navigation: AppStackNavigation;
}

export function AppHeader({ back, navigation }: Props) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title="Zelly"
        titleStyle={{
          fontWeight: '800',
          fontSize: 24,
        }}
      />
    </Appbar.Header>
  );
}
