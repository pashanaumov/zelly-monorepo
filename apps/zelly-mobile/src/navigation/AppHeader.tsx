import React from 'react';
import { Appbar } from 'react-native-paper';
import { ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs/lib/typescript/src/types';

interface Props {
  back?: boolean;
  navigation: BottomTabNavigationProp<ParamListBase>;
}

export function AppHeader({ back, navigation }: Props) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    </Appbar.Header>
  );
}
